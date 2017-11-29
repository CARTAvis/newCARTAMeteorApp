// @flow

import * as React from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Layer, Stage, Rect, Circle, Group } from 'react-konva';
import actions from './actions';
import imageActions from '../imageViewer/actions';
import profilerActions from '../profiler/actions';
import ImageViewer from '../imageViewer/ImageViewer';
import type { RectangularRegion } from './models';
import type { Action, Dispatch } from '../shared/action.models';

const Blob = require('blob');


type RegionComponentProps = {
  dispatch: Dispatch;
  cursorInfo?: string,
  mouseIsDown?: boolean;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  regionArray?: RectangularRegion[];
}

type RegionComponentState = {
  open: boolean,
  saveAsInput: string,
  anchorEl?: ?HTMLButtonElement,
  selectedRegionKey?: number,
  selectedFileExtension: string,
}

class RegionComponent extends React.Component<RegionComponentProps, RegionComponentState> {
  lastCall: number;
  div: HTMLDivElement;
  stage: Stage;
  layer: Layer;

  startX: number;
  endX: number;
  startY: number;
  endY: number;

  constructor(props) {
    super(props);
    this.lastCall = 0;
    this.state = {
      open: false,
      saveAsInput: '',
      selectedFileExtension: 'png',
    };
  }

  onMouseDown = (event: MouseEvent) => {
    this.props.dispatch(actions.setMouseIsDown(true));
    const pos = this.getMousePos(this.div, event);
    this.props.dispatch(imageActions.regionCommand('start', pos.x, pos.y));
    this.endX = pos.x;
    this.endY = pos.y;
    this.startX = this.endX;
    this.startY = this.endY;

    this.drawRect();
  };

  onMouseMove = (event: MouseEvent) => {
    if (this.props.mouseIsDown) {
      const pos = this.getMousePos(this.div, event);
      this.endX = pos.x;
      this.endY = pos.y;
      this.drawRect();
    }
  };

  onMouseUp = (event: MouseEvent) => {
    if (this.props.mouseIsDown) {
      this.props.dispatch(actions.setMouseIsDown(false));
      const pos = this.getMousePos(this.div, event);
      this.props.dispatch(imageActions.regionCommand('end', pos.x, pos.y));
      this.props.dispatch(profilerActions.getProfile());
      this.endX = pos.x;
      this.endY = pos.y;

      this.drawRect();
      const element = this.div;
      if (element) {
        element.removeEventListener('mousedown', this.onMouseDown);
        element.removeEventListener('mousemove', this.onMouseMove);
        element.removeEventListener('mouseup', this.onMouseUp);
      }
    }
  };

  getMousePos = (canvas: HTMLElement, event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  initRegion = () => {
    const element = this.div;
    if (element) {
      element.addEventListener('mousedown', this.onMouseDown);
      element.addEventListener('mousemove', this.onMouseMove);
      element.addEventListener('mouseup', this.onMouseUp);
    }
    this.props.dispatch(imageActions.setRegionType('Rectangle'));
  };

  drawRect = () => {
    const w = this.endX - this.startX;
    const h = this.endY - this.startY;
    const offsetX = (w < 0) ? w : 0;
    const offsetY = (h < 0) ? h : 0;

    if (!this.props.mouseIsDown) {
      this.props.dispatch(
        actions.setShape(this.startX + offsetX, this.startY + offsetY, Math.abs(w), Math.abs(h)),
      );
    } else {
      this.props.dispatch(
        actions.drawShape(this.startX + offsetX, this.startY + offsetY, Math.abs(w), Math.abs(h)),
      );
    }
  };

  deleteRegion = () => {
    const target = this.state.selectedRegionKey;
    if (target) {
      this.props.dispatch(actions.remove(target));
    }
  };

  resizeRect = (newX, newY, pos, index) => {
    process.nextTick(() => {
      this.props.dispatch(actions.resizeRect(newX, newY, pos, index));
    });
  };

  moveRect = (newX, newY, index) => {
    process.nextTick(() => {
      this.props.dispatch(actions.moveRect(newX, newY, index));
    });
  };

  reshape = (newW, newH, newX, newY, index) => {
    process.nextTick(() => {
      this.props.dispatch(actions.reshape(newW, newH, newX, newY, index));
    });
  };

  addAnchor = (region: RectangularRegion, index: number) => {
    const numControlPoints = region.controlPoints.length;
    const controlPointComponents = [];
    for (let i = 0; i < numControlPoints; i += 1) {
      const currentControlPoint = region.controlPoints[i];
      const controlPointComponent = (
        <Circle
          x={currentControlPoint.x}
          y={currentControlPoint.y}
          stroke="#666"
          fill="#ddd"
          strokeWidth={2}
          radius={8}
          draggable
          key={currentControlPoint.pos}
          onDragMove={(e) => {
            const x = e.target._lastPos.x;
            const y = e.target._lastPos.y;
            console.log('drag circle:', x, ';', y);
            this.resizeRect(x, y, currentControlPoint.pos, index);
          }}
        />
      );
      controlPointComponents.push(controlPointComponent);
    }

    const anchors = (
      <Group>
        {controlPointComponents}
      </Group>
    );
    const result = (
      <Group key={region.key}>
        <Rect
          x={region.x}
          y={region.y}
          width={region.w}
          height={region.h}
          stroke={region.key === this.state.selectedRegionKey ? 'green' : 'red'}
          draggable
          listening
          onDragMove={(e) => {
            const x = e.target._lastPos.x;
            const y = e.target._lastPos.y;
            console.log('drag rect:', x, ';', y);
            this.moveRect(x, y, index);
          }}

          onClick={() => {
            this.setState({
              selectedRegionKey: region.key,
            });
          }}

        />
        {anchors}
      </Group>
    );
    return result;
  };

  handleTouchTap = (event: SyntheticTouchEvent<HTMLButtonElement>) => {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  saveAs = (event) => {
    this.setState({
      saveAsInput: event.target.value,
    });
  }
  zoomIn = () => {
    this.props.dispatch(imageActions.zoom(-2));
  }
  zoomOut = () => {
    this.props.dispatch(imageActions.zoom(2));
  }
  convertToImage = () => {
    if (this.layer) {
      const canvas = this.layer.getCanvas();
      const url = canvas.toDataURL('image/png', 1);
      if (this.state.selectedFileExtension === 'png') {
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', `${this.state.saveAsInput}.${this.state.selectedFileExtension}`);
        const body = document.body;
        if (body) {
          body.appendChild(a);
          a.click();
          body.removeChild(a);
        }
      } else {
        Meteor.call('convertPNGFile', url, this.state.selectedFileExtension, (error, result) => {
          let mime = '';
          if (this.state.selectedFileExtension === 'pdf') mime = 'application/pdf';
          else if (this.state.selectedFileExtension === 'eps') mime = 'text/eps';
          else mime = 'text/ps';
          const blob = new Blob([result], { type: mime });
          const b64encoded = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.setAttribute('href', b64encoded);
          a.setAttribute('download', `${this.state.saveAsInput}.${this.state.selectedFileExtension}`);
          const body = document.body;
          if (body) {
            body.appendChild(a);
            a.click();
            body.removeChild(a);
          }
          // window.URL.revokeObjectURL(b64encoded);
        });
      }
    }
  };

  handleChange = (event, index, value) => {
    this.setState({ selectedFileExtension: value });
  };

  panZoom = (event) => {
    const pos = this.getMousePos(this.div, event);
    if (event.deltaY >= 0) {
      this.props.dispatch(imageActions.panZoom(pos.x, pos.y, 2));
    } else {
      this.props.dispatch(imageActions.panZoom(pos.x, pos.y, -2));
    }
  };

  zoomReset = () => {
    this.props.dispatch(imageActions.zoomReset());
  };

  panReset = () => {
    this.props.dispatch(imageActions.panReset());
  };

  panZoomReset = () => {
    this.panReset();
    this.zoomReset();
  };

  showCursorInfo = () => {
    const htmlObject = document.getElementById('cursorInfo');
    if (htmlObject) {
      htmlObject.innerHTML = this.props.cursorInfo ? this.props.cursorInfo.replace(/[ ]<br \/>.+\.[A-Za-z]+/, '') : '';
    }
  };

  render() {
    const { x, y, width, height } = this.props;
    let currentRegionRect = null;
    if (this.props.mouseIsDown) {
      currentRegionRect = <Rect x={x} y={y} width={width} height={height} stroke="red" listening key={x + y} />;
    }
    return (
      <div>
        <div
          ref={(node) => {
            if (node) { this.div = node; }
          }}
          style={{ position: 'relative', width: 482, height: 477 }}
          // onWheel={(e) => { this.panZoom(e); }}
          onWheel={(e) => {
            if (this.lastCall + 200 < Date.now()) {
              this.lastCall = Date.now();
              this.panZoom(e);
            }
          }}
        >
          <Stage
            id="stage"
            width={482}
            height={477}
            ref={(node) => {
              if (node) { this.stage = node; }
            }}
          >
            <Layer
              id="layer"
              ref={(node) => {
                if (node) this.layer = node;
              }}
              onMouseMove={(e) => {
                // console.log(e);
                this.props.dispatch(imageActions.setCursor(e.evt.x, e.evt.y));
                this.showCursorInfo();
              }}
            >
              <ImageViewer />
              {currentRegionRect}
              {this.props.regionArray && this.props.regionArray.map((item, index) => this.addAnchor(item, index))}
            </Layer>
          </Stage>
          <Card style={{ width: '24px', position: 'absolute', top: 0 }}>
            <Divider style={{ marginLeft: '5px', marginRight: '5px' }} />
            <button onClick={this.zoomIn} className="zoom" style={{ width: '24px' }}>+</button>
            <Divider style={{ marginLeft: '5px', marginRight: '5px' }} />
            <button onClick={this.zoomOut} className="zoom" style={{ width: '24px' }}>-</button>
          </Card>
          <Card style={{ width: '24px', position: 'absolute', bottom: 0 }}>
            <button onClick={this.panReset} className="zoom" style={{ width: '24px' }}>
              <img style={{ width: '16px', height: '16px', margin: 0 }} src="/images/pan_reset.png" alt="" />
            </button>
            <Divider style={{ marginLeft: '5px', marginRight: '5px' }} />
            <button onClick={this.zoomReset} className="zoom" style={{ width: '24px' }}>
              <img style={{ width: '16px', height: '16px' }} src="/images/zoom_reset.png" alt="" />
            </button>
            <Divider style={{ marginLeft: '5px', marginRight: '5px' }} />
            <button onClick={this.panZoomReset} className="zoom" style={{ width: '24px' }}>
              <img style={{ width: '18px', height: '18px' }} src="/images/panzoom_reset.png" alt="" />
            </button>
          </Card>
          <br />
        </div>
        <Card style={{ width: 482 }}>
          <CardText>
            <div id="cursorInfo" />
          </CardText>
        </Card>
        <RaisedButton label="rectangle" onClick={this.initRegion} />
        <RaisedButton label="delete" onClick={this.deleteRegion} />
        <RaisedButton label="save" onClick={this.handleTouchTap} />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <TextField
            floatingLabelText="Save as..."
            onChange={this.saveAs}
            style={{ margin: '10px', verticalAlign: 'middle' }}
          />
          <SelectField
            floatingLabelText="File Type"
            value={this.state.selectedFileExtension}
            onChange={this.handleChange}
            autoWidth
            style={{ width: '150px', margin: '10px', verticalAlign: 'middle' }}
          >
            <MenuItem value="pdf" primaryText="pdf" />
            <MenuItem value="eps" primaryText="eps" />
            <MenuItem value="ps" primaryText="ps" />
            <MenuItem value="png" primaryText="png" />
          </SelectField>
          <br />
          <FlatButton
            type="submit"
            label="Save"
            primary
            style={{ marginRight: 0 }}
            onClick={this.convertToImage}
          />
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  x: state.RegionDB.x,
  y: state.RegionDB.y,
  width: state.RegionDB.width,
  height: state.RegionDB.height,
  mouseIsDown: state.RegionDB.mouseIsDown,
  regionArray: state.RegionDB.regionArray,
  cursorInfo: state.ImageViewerDB.cursorInfo,
});
export default connect(mapStateToProps)(RegionComponent);

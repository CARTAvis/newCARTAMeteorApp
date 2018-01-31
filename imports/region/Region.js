import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { connect } from 'react-redux';
import { ImageViewerDB } from '../api/ImageViewerDB';
import { ContextMenu, MenuItem, ContextMenuTrigger, SubMenu } from 'react-contextmenu';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem2 from 'material-ui/MenuItem';
import LinearProgress from 'material-ui/LinearProgress';
import DropDownMenu from 'material-ui/DropDownMenu';
import { Layer, Stage, Rect, Circle, Group } from 'react-konva';
import actions from './actions';
import imageActions from '../imageViewer/actions';
import profilerActions from '../profiler/actions';
import histogramActions from '../histogram/actions';
import Colormap from '../colormap/Colormap';
// import _ from 'lodash';
import ImageViewer from '../imageViewer/ImageViewer';
import colormapActions from '../colormap/actions';
import statsActions from '../statistics/actions';

const Blob = require('blob');


// import ImageViewer2 from '../imageViewer/ImageViewer2';

let startX;
let endX;
let startY;
let endY;
let selectedColormap;
class Region extends Component {
  constructor(props) {
    super(props);
    // this.regions = [];
    this.lastCall = 0;
    this.rect = null;
    this.state = {
      open: false,
      saveAsInput: '',
      cursorInfo: '',
      regionListener: false,
      currentColorStops: [],
      colormaps: [],
      currentColorName: '',
    };
  }
  componentDidMount = () => {
    document.body.onkeydown = (e) => {
      // need to fix the 'if' logic here later
      if (e.keyCode === 8 && (this.props.regionArray.length > 0)) {
        console.log('DELETE');
        this.delete();
      }
    };
    HTTP.get(Meteor.absoluteUrl('/colormaps.json'), (err, result) => {
      if (err) console.log(err);
      else {
        this.setState({ colormaps: result.data.colormaps });
      }
    });
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.init === true) {
      console.log('TRUE');
      this.init();
    }
    if (nextProps.stops) {
      const newStops = [];
      if (nextProps.stops) {
        const total = nextProps.stops.length;
        for (let i = 0; i < total; i += 1) {
          newStops.push(i / total, nextProps.stops[i]);
        }
      }
      this.setState({ currentColorStops: newStops });
    }
    if (nextProps.colorMapName) {
      this.setState({ currentColorName: nextProps.colorMapName });
    }
  }
  onMouseDown = (event) => {
    this.props.dispatch(actions.setMouseIsDown(1));
    // const pos = this.getMousePos(document.getElementById('canvas'), event);
    const pos = this.getMousePos(this.div, event);
    this.props.dispatch(imageActions.regionCommand('start', pos.x, pos.y));
    endX = pos.x;
    endY = pos.y;
    startX = endX;
    startY = endY;
    this.drawRect();
  }
  onMouseMove = (event) => {
    if (this.props.mouseIsDown === 1) {
      // const pos = this.getMousePos(document.getElementById('canvas'), event);
      const pos = this.getMousePos(this.div, event);
      endX = pos.x;
      endY = pos.y;
      this.drawRect();
    }
  }
  onMouseUp = (event) => {
    if (this.props.mouseIsDown === 1) {
      this.props.dispatch(actions.setMouseIsDown(0));
      // const pos = this.getMousePos(document.getElementById('canvas'), event);
      const pos = this.getMousePos(this.div, event);
      this.props.dispatch(imageActions.regionCommand('end', pos.x, pos.y));
      this.props.dispatch(profilerActions.getProfile());
      this.props.dispatch(statsActions.getStatsInfo());
      this.props.dispatch(histogramActions.getHistogramData());
      endX = pos.x;
      endY = pos.y;
      this.drawRect();
      this.props.dispatch(actions.initRegion());
      this.setState({
        regionListener: false,
      });
    }
  }
  getMousePos = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }
  // setRegionArray = (coordX, coordY, width, height) => {
  //   if (this.props.regionArray) {
  //     this.regionArray = this.props.regionArray;
  //   }
  //   this.regionArray = this.regionArray.concat({
  //     x: coordX,
  //     y: coordY,
  //     w: width,
  //     h: height,
  //     key: Math.floor(Math.random() * 10000),
  //   });
  // }
  drawRect = () => {
    const w = endX - startX;
    const h = endY - startY;
    const offsetX = (w < 0) ? w : 0;
    const offsetY = (h < 0) ? h : 0;

    if (this.props.mouseIsDown === 0) {
      // this.setRegionArray(startX + offsetX, startY + offsetY, Math.abs(w), Math.abs(h));
      // console.log(`dimensions: (${startX + offsetX}, ${startY + offsetY}) (${startX + offsetX + w}, ${startY + offsetY})
      // (${startX + offsetX}, ${startY + offsetY + h}) (${startX + offsetX + w}, ${startY + offsetY + h})`);
      this.props.dispatch(
        // actions.setShape(this.regionArray),
        actions.setShape(startX + offsetX, startY + offsetY, Math.abs(w), Math.abs(h)),
      );
    } else {
      this.props.dispatch(
        actions.drawShape(startX + offsetX, startY + offsetY, Math.abs(w), Math.abs(h)),
      );
    }
  }
  delete = () => {
    const target = this.state.toDelete;
    this.props.dispatch(actions.remove(target));
    this.props.dispatch(profilerActions.getProfile());
    this.props.dispatch(histogramActions.getHistogramData());
  }

  resizeRect = (newX, newY, pos, index) => {
    process.nextTick(() => {
      this.props.dispatch(actions.resizeRect(newX, newY, pos, index));
    });
  }

  moveRect = (newX, newY, index) => {
    process.nextTick(() => {
      this.props.dispatch(actions.moveRect(newX, newY, index));
    });
  }

  reshape = (newW, newH, newX, newY, index) => {
    // this.regionArray = this.props.regionArray;
    // const newArray = update(this.regionArray[index],
    //   { x: { $set: newX }, y: { $set: newY }, w: { $set: newW }, h: { $set: newH },
    //   });
    // const data = update(this.regionArray, { $splice: [[index, 1, newArray]] });
    process.nextTick(() => {
      // this.regionArray = data;
      this.props.dispatch(actions.reshape(newW, newH, newX, newY, index));
    });
  }
  addAnchor = (item, index) => {
    // if (!this.regions.hasOwnProperty(item.key)) {
    //   this.regions[item.key] = {};
    // }

    const circlesLen = item.circles.length;
    const circles = [];
    for (let i = 0; i < circlesLen; i += 1) {
      const element = item.circles[i];
      const circle = (
        <Circle
          x={element.x}
          y={element.y}
          stroke="#666"
          fill="#ddd"
          strokeWidth={2}
          radius={8}
          draggable
          key={element.pos}
          onDragMove={(e) => {
            const x = e.target._lastPos.x;
            const y = e.target._lastPos.y;
            console.log('drag circle:', x, ';', y);
            this.resizeRect(x, y, element.pos, index);
          }}
          // ref={(node) => {
          //   if (node && !this.regions[item.key].hasOwnProperty(element.pos)) {
          //     console.log('regiser circle:', element.pos);
          //     this.regions[item.key][element.pos] = node;
          //     this.regions[item.key][element.pos].on('dragmove', () => {
          //       const x = this.regions[item.key][element.pos].getAttrs().x;
          //       const y = this.regions[item.key][element.pos].getAttrs().y;
          //       console.log('drag0:', x, ';', y);
          //       this.resizeRect(x, y, element.pos, index);
          //     });
          //   }
          // }}
        />
      );
      circles.push(circle);
    }

    const anchors = (
      <Group>
        {circles}
      </Group>
    );
    const result = (
      <Group
        key={item.key}
        width={482}
      >
        <Rect
          x={item.x}
          y={item.y}
          width={item.w}
          height={item.h}
          stroke={this.state.toDelete === item.key ? 'green' : 'red'}
          draggable
          listening
          onDragMove={(e) => {
            const x = e.target._lastPos.x;
            const y = e.target._lastPos.y;
            console.log('drag rect:', x, ';', y);
            this.moveRect(x, y, index);
          }}
          // onDragEnd={(e) => {
          //   console.log(`dimensions: (${e.target.attrs.x}, ${e.target.attrs.y}),
          //   (${e.target.attrs.x + e.target.attrs.width}, ${e.target.attrs.y}),
          //   (${e.target.attrs.x}, ${e.target.attrs.y + e.target.attrs.height}),
          //   (${e.target.attrs.x + e.target.attrs.width}, ${e.target.attrs.y + e.target.attrs.height})`);
          // }}
          onClick={() => {
            this.setState({
              toDelete: item.key,
            });
            const pos = this.getMousePos(this.div, event);
            this.props.dispatch(actions.selectRegion(pos.x, pos.y));
            this.props.dispatch(profilerActions.getProfile());
            this.props.dispatch(histogramActions.getHistogramData());
          }}
          // ref={(node) => {
          //   if (node && !this.regions[item.key].hasOwnProperty('shape')) {
          //     this.regions[item.key].shape = node;
          //     this.regions[item.key].shape.on('dragmove', () => {
          //       // console.log('dragmove');
          //       // const itemW = item.w;
          //       // const itemH = item.h;
          //       // const i = index;
          //       // this.props.regionArray.forEach((obj, index) => {
          //       //   if (obj.key === item.key) {
          //       //     itemW = obj.w;
          //       //     itemH = obj.h;
          //       //     i = index;
          //       //   }
          //       // });
          //       const x = this.regions[item.key].shape.getAttrs().x;
          //       const y = this.regions[item.key].shape.getAttrs().y;
          //       this.moveRect(x, y, index);
          //       // this.reshape(itemW, itemH, x, y, i);
          //     });
          //     this.regions[item.key].shape.on('click', () => {
          //       this.setState({
          //         toDelete: item.key,
          //       });
          //     });
          //   }
          // }}
        />
        {anchors}
      </Group>
    );
    return result;
  }
  handleTouchTap = (event) => {
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
  handleTouchTapColormaps = (event) => {
    event.preventDefault();
    this.setState({
      colormapsOpen: true,
      anchorElColomaps: event.currentTarget,
    });
  }
  handleRequestCloseColormaps = () => {
    this.setState({ colormapsOpen: false });
  }
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
      const imageViewerCanvas = this.layer.toCanvas();
      const colormapCanvas = this.colormap.toCanvas();
      const canvas = document.createElement('canvas');
      canvas.width = 557;
      canvas.height = 477;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(imageViewerCanvas, 0, 0);
      ctx.drawImage(colormapCanvas, 482, 0);
      // const canvas = this.layer.getCanvas();
      const url = canvas.toDataURL('image/png', 1);
      if (this.state.value === 'png') {
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', `${this.state.saveAsInput}.${this.state.value}`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        Meteor.call('convertPNGFile', url, this.state.value, (error, result) => {
          let mime = '';
          if (this.state.value === 'pdf') mime = 'application/pdf';
          else if (this.state.value === 'eps') mime = 'text/eps';
          else mime = 'text/ps';
          const blob = new Blob([result], { type: mime });
          const b64encoded = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.setAttribute('href', b64encoded);
          a.setAttribute('download', `${this.state.saveAsInput}.${this.state.value}`);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        // window.URL.revokeObjectURL(b64encoded);
        });
      }
    }
  }
  handleChange = (event, index, value) => {
    this.setState({ value });
  }
  panZoom = (event) => {
    const pos = this.getMousePos(this.div, event);
    if (event.deltaY >= 0) {
      this.props.dispatch(imageActions.panZoom(pos.x, pos.y, 2));
    } else {
      this.props.dispatch(imageActions.panZoom(pos.x, pos.y, -2));
    }
  }
  zoomReset = () => {
    this.props.dispatch(imageActions.zoomReset());
  }
  panReset = () => {
    this.props.dispatch(imageActions.panReset());
  }
  panZoomReset = () => {
    this.panReset();
    this.zoomReset();
  }
  showCursorInfo = () => {
    const htmlObject = document.getElementById('cursorInfo');
    if (this.props.cursorInfo) {
      htmlObject.innerHTML = this.props.cursorInfo.replace(/[ ]<br \/>.+\.[A-Za-z]+/, '');
    } else {
      htmlObject.innerHTML = '';
    }
  }
  removeSetting = () => {
    // this.setState({ items: _.reject(this.state.items, { i }) });
    this.props.removeSetting('Image');
  }
  setSetting = () => {
    // console.log('THE TYPE TO BE PASSED: ', type);
    this.props.setSetting('Image');
  }
  init = () => {
    console.log('INIT');
    if (this.props.stack) {
      if (this.props.stack.layers.length > 0) {
        this.setState({
          regionListener: true,
        });
        this.props.dispatch(imageActions.setRegionType('Rectangle'));
        this.props.dispatch(histogramActions.selectRegionHisto());
      }
    }
  }
  setCurrentColorStops = (stops) => {
    const total = stops.length;
    const newStops = [];
    for (let i = 0; i < total; i += 1) {
      newStops.push(i / total, stops[i]);
    }
    this.setState({
      currentColorStops: newStops,
    });
  }
  render() {
    const { x, y, width, height, stops } = this.props;
    const newStops = [];
    if (stops) {
      const total = stops.length;
      for (let i = 0; i < total; i += 1) {
        newStops.push(i / total, stops[i]);
      }
    }
    this.rect = (
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke="red"
        listening
        key={x + y}
      />
    );
    return (
      <div>
        <ContextMenuTrigger id="menu2">
          <div
            ref={(node) => { this.div = node; }}
            style={{ position: 'relative', height: 477, display: 'flex', flexDirection: 'row' }}
          >
            <Stage
              id="stage"
              width={482}
              height={477}
            >
              <Layer
                id="layer"
                ref={(node) => {
                  if (node) this.layer = node;
                }}
              >
                <Group
                  onMouseDown={(e) => {
                  // console.log('MOUSEDOWN');
                    if (this.state.regionListener) {
                    // console.log('MOUSE DOWN: ', e);
                      this.onMouseDown(e.evt);
                    }
                  }}
                  onMouseMove={(e) => {
                    window.onwheel = () => true;
                    if (this.state.regionListener) {
                      this.onMouseMove(e.evt);
                    }
                    if (this.props.stack) {
                      if (this.props.stack.layers.length > 0 && !this.props.mouseIsDown) {
                        const pos = this.getMousePos(this.div, e.evt);
                        this.props.dispatch(imageActions.setCursor(pos.x, pos.y));
                        this.showCursorInfo();
                      }
                    }
                  }}
                  onMouseUp={(e) => {
                    if (this.state.regionListener) {
                      this.onMouseUp(e.evt);
                    }
                  }}
                  onWheel={(e) => {
                  // console.log('ONWHEEL ', e);
                    if (this.props.stack) {
                      if (this.props.stack.layers.length > 0) {
                        window.onwheel = () => false;
                        if (this.lastCall + 200 < Date.now()) {
                          this.lastCall = Date.now();
                          this.panZoom(e.evt);
                        }
                      }
                    }
                  }}
                >
                  <ImageViewer />
                  {(this.props.mouseIsDown === 1) ? this.rect : false}
                  {this.props.regionArray ?
                    this.props.regionArray.map((item, index) => this.addAnchor(item, index)) : false}
                </Group>
              </Layer>
            </Stage>
            <Stage
              width={75}
              height={477}
            >
              <Layer
                ref={(node) => {
                  if (node) {
                    this.colormap = node;
                  }
                }}
              >
                <Rect
                  width={75}
                  height={477}
                  fill="#00000"
                />
                <Colormap />
              </Layer>
            </Stage>
            <Card style={{ width: '24px', position: 'absolute', top: 0 }} >
              <Divider className="divider" />
              <button onClick={this.zoomIn} className="zoom">+</button>
              <Divider className="divider" />
              <button onClick={this.zoomOut} className="zoom">-</button>
              <Divider className="divider" />
              <button onClick={this.setSetting} className="zoom">
                <img className="iconImg" src="/images/tools.png" alt="" />
              </button>
              <Divider className="divider" />
              <button onClick={this.handleTouchTap} className="zoom">
                <img className="iconImg" src="/images/save.png" alt="" />
              </button>
            </Card>
            <Card style={{ width: '24px', position: 'absolute', bottom: 0 }} >
              <button onClick={this.panReset} className="zoom">
                <img className="iconImg" src="/images/pan_reset.png" alt="" />
              </button>
              <Divider className="divider" />
              <button onClick={this.zoomReset} className="zoom">
                <img className="iconImg" src="/images/zoom_reset.png" alt="" />
              </button>
              <Divider className="divider" />
              <button onClick={this.panZoomReset} className="zoom">
                <img className="iconImg" src="/images/panzoom_reset.png" alt="" />
              </button>
            </Card>
            <Card style={{ width: '24px', position: 'absolute', bottom: 50, left: '482px' }} >
              <button onClick={this.handleTouchTapColormaps} className="zoom">
                <img className="iconImg" src="/images/colorbar.jpg" alt="" />
              </button>
            </Card>
            <br />
          </div>
          {this.props.requestingFile ? <LinearProgress style={{ width: 482 }} mode="indeterminate" /> : false}
          <Card style={{ width: 557 }}>
            <CardText>
              <div id="cursorInfo" />
            </CardText>
          </Card>
          <Popover
            open={this.state.colormapsOpen}
            anchorEl={this.state.anchorElColomaps}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.handleRequestCloseColormaps}
            style={{ width: 150, height: 100 }}
          >
            <DropDownMenu
              value={this.state.currentColorName}
              maxHeight={250}
              onChange={(event, key, value) => {
                selectedColormap = key;
                this.setState({ currentColorName: this.state.colormaps[key].name });
                this.setCurrentColorStops(this.state.colormaps[key].stops);
                if (this.props.stack) {
                  if (this.props.stack.layers.length > 0) {
                    this.props.dispatch(colormapActions.setColormap(value));
                  }
                }
              }}
            >
              {this.props.colormaps ? this.props.colormaps.map((item, index) =>
                (<MenuItem2
                  value={item}
                  primaryText={item}
                  key={index}
                  onMouseEnter={() => {
                    this.setCurrentColorStops(this.state.colormaps[index].stops);
                  }}
                  onMouseLeave={() => {
                    if (selectedColormap >= 0) {
                      this.setCurrentColorStops(this.state.colormaps[selectedColormap].stops);
                    } else {
                      this.setCurrentColorStops([]);
                    }
                  }}
                />)) : null}
            </DropDownMenu>
            <Stage
              width={100}
              height={15}
            >
              <Layer>
                <Rect
                  width={100}
                  height={15}
                  stroke="black"
                  // fill={this.state.color}
                  fillLinearGradientStartPoint={{ x: 0, y: 477 }}
                  fillLinearGradientEndPoint={{ x: 100, y: 477 }}
                  fillLinearGradientColorStops={this.state.currentColorStops}
                />
              </Layer>
            </Stage>
          </Popover>
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
              value={this.state.value}
              onChange={this.handleChange}
              autoWidth
              style={{ width: '150px', margin: '10px', verticalAlign: 'middle' }}
            >
              <MenuItem2 value="pdf" primaryText="pdf" />
              <MenuItem2 value="eps" primaryText="eps" />
              <MenuItem2 value="ps" primaryText="ps" />
              <MenuItem2 value="png" primaryText="png" />
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
        </ContextMenuTrigger>
        <ContextMenu id="menu2">
          <MenuItem onClick={this.delete}>Delete</MenuItem>
        </ContextMenu>
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
  requestingFile: state.ImageViewerDB.requestingFile,
  stack: state.ImageViewerDB.stack,
  profileReady: state.RegionDB.profileReady,
  init: state.RegionDB.init,
  colormaps: state.ColormapDB.colormaps,
  colorMapName: state.ColormapDB.colorMapName,
  stops: state.ColormapDB.stops,
});
export default connect(mapStateToProps)(Region);

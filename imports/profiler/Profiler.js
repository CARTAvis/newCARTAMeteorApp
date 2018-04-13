import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import actions from './actions';
// import api from '../api/ApiService';

// const d3 = Plotly.d3;

class Profiler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveAsInput: '',
    };
    this.props.dispatch(actions.setupProfiler());
    // this.getRef = this.getRef.bind(this);
  }
  componentDidMount = () => {
    // console.log('componentDidMount', this.props);
    const trace1 = {
      // x: [1, 2, 3, 4],
      // y: [10, 15, 13, 17],
      type: 'scatter',
    };
    const layout = {
      height: 395,
    };
    const data = [trace1];
    Plotly.newPlot(this.el, data, layout);
    this.el.on('plotly_hover', (e) => {
      this.props.dispatch(actions.onHover(e));
    });
    this.el.on('plotly_relayout', (e) => {
      if (!e.width) {
        this.props.dispatch(actions.onZoomPan(e));
        // d3.select('g.legend').selectAll('.traces').on('click', (e) => {
        //   console.log('LEGEND ITEM CLICKED:', e[0].trace.index);
        // });
      }
    });
  }
  plotProfile = (profileData, layout) => {
    if (profileData && layout) {
      Plotly.newPlot(this.el, profileData, layout);
      this.el.on('plotly_hover', (e) => {
        this.props.dispatch(actions.onHover(e));
      });
      this.el.on('plotly_relayout', (e) => {
        if (!e.width) {
          this.props.dispatch(actions.onZoomPan(e));
        }
      });
    }
  }
  adjustChartWidth = () => {
    const layout = {
      width: this.props.width - 20,
    };
    Plotly.relayout(this.el, layout);
  }
  relayoutOnHover = () => {
    Plotly.Fx.hover(this.el, [this.props.data]);
  }
  relayoutOnZoomPan = () => {
    let data = null;
    data = {};
    if (this.props.zoomPanData.xRange) data['xaxis.range'] = this.props.zoomPanData.xRange;
    if (this.props.zoomPanData.yRange) data['yaxis.range'] = this.props.zoomPanData.yRange;
    if (this.props.zoomPanData.xAutorange) data['xaxis.autorange'] = this.props.zoomPanData.xAutorange;
    if (this.props.zoomPanData.yAutorange) data['yaxis.autorange'] = this.props.zoomPanData.yAutorange;
    Plotly.relayout(this.el, data);
  }
  // getRef = (el) => {
  //   this.el = el;
  // }
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
  saveAs = (event) => {
    this.setState({
      saveAsInput: event.target.value,
    });
  }
  handleChange = (event, index, value) => {
    this.setState({ value });
  }
  convertToImage = () => {
    Plotly.toImage(this.el, {
      format: 'svg',
      width: 400,
      height: 400,
      filename: 'newplot',
    }).then((url) => {
      const userID = Meteor.userId();
      const decodedURL = decodeURIComponent(url.replace(/^data:image\/svg\+xml,/, ''));
      Meteor.call('convertSVGFile', decodedURL, this.state.value, userID, (error, result) => {
        let mime = '';
        if (this.state.value === 'pdf') mime = 'application/pdf';
        else mime = 'text/ps';
        const b64encoded = `data:${mime};base64, ${result}`;
        const a = document.createElement('a');
        a.setAttribute('href', b64encoded);
        a.setAttribute('download', `${this.state.saveAsInput}.${this.state.value}`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        Meteor.call('removeFile', this.state.value, userID);
      });
    });
  }

  updateChannelFrame = (animatorTypeList, profileData) => {
    let channelIndicator = 0;
    if (animatorTypeList && profileData && profileData.length > 0) {
      const imageAnimator = animatorTypeList.find((element) => {
        return element.type === 'Image';
      });
      const channelAnimator = animatorTypeList.find((element) => {
        return element.type === 'Channel';
      });
      const { selection } = imageAnimator;
      const { fileList } = selection;
      const imageName = fileList[selection.frame];
      const currentProfile = profileData.find((element) => {
        return element.id.includes(imageName);
      });
      const { x } = currentProfile;
      if (x) {
        channelIndicator = x[channelAnimator.selection.frame];
      }
    }
    let layout = {};
    if (channelIndicator !== undefined) {
      layout = {
        shapes: [{
          type: 'line',
          x0: channelIndicator,
          y0: 0,
          x1: channelIndicator,
          yref: 'paper',
          y1: 1,
          line: {
            color: 'red',
            width: 1.5,
            // dash: 'dot',
          },
        }],
      };
    }
    if (this.el !== undefined) {
      Plotly.relayout(this.el, layout);
    }
  }

  render() {
    const { animatorTypeList, profileData, width, data, zoomPanData } = this.props;
    const layout = { height: 395 };
    this.plotProfile(profileData, layout);
    this.updateChannelFrame(animatorTypeList, profileData);
    if (width && this.el) {
      this.adjustChartWidth();
    }
    if (profileData && profileData.length > 0 && data) {
      this.relayoutOnHover();
    }
    if (zoomPanData) {
      this.relayoutOnZoomPan();
    }

    console.log('RENDER PROPS: ', this.props);
    const curveNameList = [];
    if (profileData) {
      profileData.forEach((element) => {
        curveNameList.push(element.name);
      });
    }
    const curveNameMenuItem = curveNameList.map(item => (
      <MenuItem value={item} primaryText={item} />
    ));
    return (
      <div>
        <button onClick={this.handleTouchTap}>
          <img className="iconImg" src="/images/save.png" alt="" />
        </button>
        <SelectField
          floatingLabelText="Selected Curve"
          value={this.props.profilerSettings.selectCurve}
          onChange={(event, index, value) => {
            this.props.dispatch(actions.setSelectedCurve(value));
          }}
          autoWidth
          style={{ width: '150px', margin: '10px', verticalAlign: 'middle' }}
        >
          {/* {curveNameList} */}
          {curveNameMenuItem}
        </SelectField>
        {/* <RaisedButton label="save" onClick={this.handleTouchTap} /> */}
        <div style={{ marginTop: '2px' }} ref={(el) => { this.el = el; }} id="profiler" />
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
          /><br />
          <SelectField
            floatingLabelText="File Type"
            value={this.state.value}
            onChange={this.handleChange}
            autoWidth
            style={{ width: '150px', margin: '10px', verticalAlign: 'middle' }}
          >
            <MenuItem value="pdf" primaryText="pdf" />
            <MenuItem value="ps" primaryText="ps" />
          </SelectField>
          <br />
          <FlatButton
            type="submit"
            label="Save"
            primary
            // href={`data:text/eps;base64,${this.state.src}`}
            style={{ marginRight: 0 }}
            onClick={this.convertToImage}
          />
        </Popover>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ flex: 1 }}>
            <Checkbox
              label="Auto Generate"
              // style={{ width: 150 }}
              checked={this.props.profilerSettings.autoGenerate}
              onCheck={() => {
                this.props.dispatch(actions.setAutoGen(!this.props.profilerSettings.autoGenerate));
              }}
            />
            <SelectField
              floatingLabelText="Auto Mode"
              value={this.props.profilerSettings.genMode}
              disabled={!this.props.profilerSettings.autoGenerate}
              onChange={(event, index, value) => {
                this.props.dispatch(actions.setGenerationMode(value));
              }}
              autoWidth
              style={{ width: '150px', margin: '10px', verticalAlign: 'middle' }}
            >
              {/* TODO: don't use the hard-code menu item */}
              <MenuItem value="Current" primaryText="Current" />
              <MenuItem value="All" primaryText="All" />
            </SelectField>
          </div>
          <div style={{ flex: 1 }}>
            <button
              disabled={this.props.profilerSettings.autoGenerate}
              // style={{ position: 'absolute', right: '23px', bottom: 0 }}
              onClick={() => { this.props.dispatch(actions.newProfile()); }}
            >
              Add Profile
            </button>
          </div>
          <div style={{ flex: 1 }}>
            <button
              disabled={this.props.profilerSettings.autoGenerate}
              // style={{ position: 'absolute', right: '23px', bottom: 0 }}
              onClick={() => {
                this.props.dispatch(actions.removeProfile());
              }}
            >
              Delete Profile
            </button>
          </div>
          <div style={{ flex: 1 }}>
            <button
              // disabled={this.props.profilerSettings.autoGenerate}
              // style={{ position: 'absolute', right: '23px', bottom: 0 }}
              onClick={() => {
                this.props.dispatch(actions.clearProfiles());
              }}
            >
              Clear Profile
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profileData: state.ProfilerDB.profileData,
  data: state.ProfilerDB.data,
  zoomPanData: state.ProfilerDB.zoomPanData,
  profilerSettings: state.ProfilerDB.profilerSettings,
  animatorTypeList: state.AnimatorDB.animatorTypeList,
});
export default connect(mapStateToProps)(Profiler);

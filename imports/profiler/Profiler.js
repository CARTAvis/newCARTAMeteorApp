import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
/* material-ui beta */
import Select from 'material-ui-next/Select';
import { MenuItem } from 'material-ui-next/Menu';
import { InputLabel } from 'material-ui-next/Input';
import { FormControl } from 'material-ui-next/Form';
import Button from 'material-ui-next/Button';
import TextField from 'material-ui-next/TextField';
import Popover from 'material-ui-next/Popover';

import FlatButton from 'material-ui/FlatButton';
// import Popover from 'material-ui/Popover';
import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
// import TextField from 'material-ui/TextField';
import actions from './actions';
import FCactions from '../featureContainer/actions';
// import api from '../api/ApiService';
this.dragging = false;
class Profiler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveAsInput: '',
      anchorEl: null,
      value: '',
      open: false,
    };
    this.props.dispatch(actions.setupProfiler());
    // this.getRef = this.getRef.bind(this);
  }
  componentDidMount = () => {
    const trace1 = {
      type: 'scatter',
    };
    const layout = {
      height: 395,
    };
    const data = [trace1];
    Plotly.newPlot(this.el, data, layout);
    if (this.props.profileData) {
      Plotly.deleteTraces(this.el, -1);
      Plotly.addTraces(this.el, this.props.profileData);
    }
    this.el.on('plotly_hover', (e) => {
      this.props.dispatch(actions.onHover(e));
    });
    this.el.on('plotly_relayout', (e) => {
      if (!e.width) {
        console.log('PLOTLY RELAYOUT');
        this.props.dispatch(actions.onZoomPan(e));
      }
    });
  }
  componentWillReceiveProps = (nextProps) => {
    // console.log('THIS.PROPS: ', this.props);
    // console.log('NEXT PROPS: ', nextProps);
    if (JSON.stringify(nextProps.profileData) !== JSON.stringify(this.props.profileData)) {
      Plotly.deleteTraces(this.el, -1);
      Plotly.addTraces(this.el, nextProps.profileData);
    }
    if (nextProps.width) {
      const layout = {
        width: nextProps.width - 20,
      };
      Plotly.relayout(this.el, layout);
    }
    if (nextProps.data) {
      Plotly.Fx.hover(this.el, nextProps.data);
    }
    if (nextProps.zoomPanData) {
      // console.log('ZOOMPANDATA: ', nextProps.zoomPanData);
      let data = null;
      data = {};
      if (nextProps.zoomPanData.xRange) data['xaxis.range'] = nextProps.zoomPanData.xRange;
      if (nextProps.zoomPanData.yRange) data['yaxis.range'] = nextProps.zoomPanData.yRange;
      if (nextProps.zoomPanData.xAutorange) data['xaxis.autorange'] = nextProps.zoomPanData.xAutorange;
      if (nextProps.zoomPanData.yAutorange) data['yaxis.autorange'] = nextProps.zoomPanData.yAutorange;
      // console.log('ZOOM DATA: ', data);
      Plotly.relayout(this.el, data);
    }
  }
  // getRef = (el) => {
  //   this.el = el;
  // }
  handleTouchTap = () => {
    // This prevents ghost click.
    // event.preventDefault();
    this.setState({
      open: true,
      anchorEl: this.saveProfileButton,
    });
  };
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
    // this.props.dispatch(FCactions.disableDragging(false));
  };
  saveAsInput = (event) => {
    // this.props.dispatch(FCactions.disableDragging(true));
    this.setState({
      saveAsInput: event.target.value,
    });
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value });
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
  render() {
    console.log('RENDER PROPS: ', this.props);
    return (
      <div>
        <button
          ref={(node) => { this.saveProfileButton = node; }}
          onClick={this.handleTouchTap}
          onMouseEnter={() => {
            this.props.dispatch(FCactions.disableDragging(true));
          }}
        >
          <img className="iconImg" src="/images/save.png" alt="" />
        </button>
        <div
          // onMouseMove={() => {
          //   console.log('MOUSE MOVE');
          //   //
          //   if (!this.props.isDragging) {
          //     this.props.dispatch(FCactions.disableDragging(true));
          //   }
          // }}
          // onMouseLeave={() => {
          //   console.log('MOUSE LEAVE');
          //   // if (this.dragging === true && this.mousedown === true) {
          //   //   console.log('MOUSE UP');
          //     this.props.dispatch(FCactions.disableDragging(false));
          //   // }
          //   // this.dragging = false;
          //   // this.mousedown = false;
          // }}
          style={{ marginTop: '2px' }}
          ref={(el) => { this.el = el; }}
          id="profiler"
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          onClose={this.handleRequestClose}
        >
          <TextField
            label="Save as..."
            placeholder="File name"
            onChange={this.saveAsInput}
            style={{ margin: '10px', verticalAlign: 'middle' }}
            margin="normal"
          />
          <FormControl
            style={{ width: '150px', margin: '5px', verticalAlign: 'middle' }}
          >
            <InputLabel htmlFor="file-type">File type</InputLabel>
            <Select
              inputProps={{
                name: 'file type',
                id: 'file-type',
              }}
              onChange={this.handleChange}
              value={this.state.value}
              // style={{ width: '150px', margin: '10px', verticalAlign: 'middle' }}
            >
              <MenuItem value="pdf">pdf</MenuItem>
              <MenuItem value="ps">ps</MenuItem>
            </Select>
          </FormControl>
          <br />
          <Button
            variant="flat"
            type="submit"
            size="medium"
            onClick={this.convertToImage}
            style={{ marginRight: 0 }}
            color="primary"
          >
            Save
          </Button>
        </Popover>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profileData: state.ProfilerDB.profileData,
  data: state.ProfilerDB.data,
  zoomPanData: state.ProfilerDB.zoomPanData,
  isDragging: state.FeatureContainerDB.isDragging,
});
export default connect(mapStateToProps)(Profiler);

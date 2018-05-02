import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import actions from '../actions';

class ProfilerRangeSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { profileData } = this.props;
    const { selectCurve } = this.props.profilerSettings;
    let currentProfile;
    if (profileData) {
      currentProfile = profileData.find((element) => {
        return element.id.includes(selectCurve);
      });
    }
    let maximum = 1;
    let minimum = 0;
    if (currentProfile) {
      const { x } = currentProfile;
      if (x) {
        maximum = Math.max(...x);
        minimum = Math.min(...x);
      }
    }
    const { profilerSettings } = this.props;
    // const { zoomMin, zoomMax, zoomMinPercent, zoomMaxPercent } = profilerSettings;
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ flex: 1 }}>
            <p>Minimum: </p>
          </div>
          <div style={{ flex: 1 }}>
            <TextField
              floatingLabelText="value"
              style={{ width: '30%' }}
              onKeyDown={(event) => {
                const data = {};
                data['xaxis.range[0]'] = Number(profilerSettings.zoomMin);
                data['xaxis.range[1]'] = Number(profilerSettings.zoomMax);
                const minPercent = 100 * ((profilerSettings.zoomMin - minimum) / (maximum - minimum));
                const maxPercent = 100 * ((profilerSettings.zoomMax - minimum) / (maximum - minimum));
                if (event.keyCode === 13) {
                  this.props.dispatch(actions.onZoomPan(data));
                  this.props.dispatch(actions.setZoomRangePercent(minPercent, maxPercent));
                }
              }}
              onChange={(event, newValue) => {
                this.props.dispatch(actions.setZoomRange(newValue, profilerSettings.zoomMax));
              }}
              value={profilerSettings.zoomMin}
            />
          </div>
          <div style={{ flex: 1 }}>
            <TextField
              floatingLabelText="percentage"
              style={{ width: '30%' }}
              onKeyDown={(event) => {
                const data = {};
                data['xaxis.range[0]'] = minimum + ((maximum - minimum) * 0.01 * Number(profilerSettings.zoomMinPercent));
                data['xaxis.range[1]'] = minimum + ((maximum - minimum) * 0.01 * Number(profilerSettings.zoomMaxPercent));
                if (event.keyCode === 13) {
                  this.props.dispatch(actions.onZoomPan(data));
                  this.props.dispatch(actions.setZoomRange(data['xaxis.range[0]'], data['xaxis.range[1]']));
                }
              }}
              onChange={(event, newValue) => {
                this.props.dispatch(actions.setZoomRangePercent(newValue, profilerSettings.zoomMaxPercent));
              }}
              value={profilerSettings.zoomMinPercent}
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ flex: 1 }}>
            <p>Maximum: </p>
          </div>
          <div style={{ flex: 1 }}>
            <TextField
              floatingLabelText="value"
              style={{ width: '30%' }}
              onKeyDown={(event) => {
                const data = {};
                data['xaxis.range[0]'] = Number(profilerSettings.zoomMin);
                data['xaxis.range[1]'] = Number(profilerSettings.zoomMax);
                const minPercent = 100 * ((profilerSettings.zoomMin - minimum) / (maximum - minimum));
                const maxPercent = 100 * ((profilerSettings.zoomMax - minimum) / (maximum - minimum));
                if (event.keyCode === 13) {
                  this.props.dispatch(actions.onZoomPan(data));
                  this.props.dispatch(actions.setZoomRangePercent(minPercent, maxPercent));
                }
              }}
              onChange={(event, newValue) => {
                this.props.dispatch(actions.setZoomRange(profilerSettings.zoomMin, newValue));
              }}
              value={profilerSettings.zoomMax}
            />
          </div>
          <div style={{ flex: 1 }}>
            <TextField
              floatingLabelText="percentage"
              style={{ width: '30%' }}
              onKeyDown={(event) => {
                const data = {};
                data['xaxis.range[0]'] = minimum + ((maximum - minimum) * 0.01 * Number(profilerSettings.zoomMinPercent));
                data['xaxis.range[1]'] = minimum + ((maximum - minimum) * 0.01 * Number(profilerSettings.zoomMaxPercent));
                if (event.keyCode === 13) {
                  this.props.dispatch(actions.onZoomPan(data));
                  this.props.dispatch(actions.setZoomRange(data['xaxis.range[0]'], data['xaxis.range[1]']));
                }
              }}
              onChange={(event, newValue) => {
                this.props.dispatch(actions.setZoomRangePercent(profilerSettings.zoomMinPercent, newValue));
              }}
              value={profilerSettings.zoomMaxPercent}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // profilerMainSetting: state.ProfilerDB.profilerMainSetting,
  profilerSettings: state.ProfilerDB.profilerSettings,
  profileData: state.ProfilerDB.profileData,
});

export default connect(mapStateToProps)(ProfilerRangeSetting);

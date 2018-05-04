import React, { Component } from 'react';
import { connect } from 'react-redux';
/* material-ui beta */
import { FormGroup, FormControlLabel } from 'material-ui-next/Form';
import Checkbox from 'material-ui-next/Checkbox';
import TextField from 'material-ui-next/TextField';
import actions from './actions';

class HistogramSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount = () => {
    if (this.channelInput && this.props.histogramSettings.planeMode === 'Channel') {
      this.channelInput.className = 'show';
    }
  }
  render() {
    const { histogramSettings } = this.props;
    return (
      <div>
        <FormGroup row={false}>
          <FormControlLabel
            control={
              <Checkbox
                checked={histogramSettings.planeMode === 'All'}
                onChange={(event, isInputChecked) => {
                  if (isInputChecked) {
                    this.props.dispatch(actions.setPlaneMode('All'));
                    if (this.channelInput.className === 'show') {
                      this.channelInput.className = 'hide';
                    }
                  }
                }}
              />
            }
            label="all channels"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={histogramSettings.planeMode === 'Current'}
                onChange={(event, isInputChecked) => {
                  if (isInputChecked) {
                    this.props.dispatch(actions.setPlaneMode('Current'));
                    if (this.channelInput.className === 'show') {
                      this.channelInput.className = 'hide';
                    }
                  }
                }}
              />
            }
            label="current channel"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={histogramSettings.planeMode === 'Range'}
                onChange={(event, isInputChecked) => {
                  if (isInputChecked) {
                    this.props.dispatch(actions.setPlaneMode('Range'));
                    if (this.channelInput.className === 'show') {
                      this.channelInput.className = 'hide';
                    }
                  }
                }}
              />
            }
            label="range"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={histogramSettings.planeMode === 'Channel'}
                onChange={(event, isInputChecked) => {
                  if (isInputChecked) {
                    console.log('VALUE: ', isInputChecked);
                    this.props.dispatch(actions.setPlaneMode('Channel'));
                    if (this.channelInput) {
                      this.channelInput.className = 'show';
                    }
                  }
                }}
              />
            }
            label="select channel"
          />
        </FormGroup>
        <div
          ref={(node) => { if (node) { this.channelInput = node; } }}
          className="hide"
        >
          <TextField
            label="select a channel"
            // fullWidth={false}
            style={{ width: '30%' }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                this.props.dispatch(actions.setPlaneChannel(this.state.channelInput));
              }
            }}
            onChange={(event) => {
              this.setState({ channelInput: event.target.value });
            }}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  histogramSettings: state.HistogramSettingsDB.histogramSettings,
});

export default connect(mapStateToProps)(HistogramSelection);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
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
        <Checkbox
          label="all channels"
          checked={histogramSettings.planeMode === 'All'}
          onCheck={(event, isInputChecked) => {
            if (isInputChecked) {
              this.props.dispatch(actions.setPlaneMode('All'));
              if (this.channelInput.className === 'show') {
                this.channelInput.className = 'hide';
              }
            }
          }}
        />
        <Checkbox
          label="current channel"
          checked={histogramSettings.planeMode === 'Current'}
          onCheck={(event, isInputChecked) => {
            if (isInputChecked) {
              this.props.dispatch(actions.setPlaneMode('Current'));
              if (this.channelInput.className === 'show') {
                this.channelInput.className = 'hide';
              }
            }
          }}
        />
        <Checkbox
          label="range"
          checked={histogramSettings.planeMode === 'Range'}
          onCheck={(event, isInputChecked) => {
            if (isInputChecked) {
              this.props.dispatch(actions.setPlaneMode('Range'));
              if (this.channelInput.className === 'show') {
                this.channelInput.className = 'hide';
              }
            }
          }}
        />
        <Checkbox
          label="select channel"
          checked={histogramSettings.planeMode === 'Channel'}
          onCheck={(event, isInputChecked) => {
            if (isInputChecked) {
              console.log('VALUE: ', isInputChecked);
              this.props.dispatch(actions.setPlaneMode('Channel'));
              if (this.channelInput) {
                this.channelInput.className = 'show';
              }
            }
          }}
        />
        <div
          ref={(node) => { if (node) { this.channelInput = node; } }}
          className="hide"
        >
          <TextField
            floatingLabelText="select a channel"
            fullWidth={false}
            style={{ width: '30%' }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                this.props.dispatch(actions.setPlaneChannel(this.state.channelInput));
              }
            }}
            onChange={(event, channelInput) => {
              this.setState({ channelInput });
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

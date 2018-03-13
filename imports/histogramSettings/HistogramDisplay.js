import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';
import actions from './actions';

class HistogramDisplay extends Component {
  constructor(props) {
    console.log('HISTOGRAM SETTINGS');
    super(props);
    this.state = {
      binWidth: this.props.histogramSettings.binWidth.toExponential(6),
      binCount: this.props.histogramSettings.binCount,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.histogramSettings.binWidth !== this.props.histogramSettings.binWidth) {
      this.setState({
        binWidth: nextProps.histogramSettings.binWidth.toExponential(6),
      });
    }
    if (nextProps.histogramSettings.binCount !== this.props.histogramSettings.binCount) {
      this.setState({
        binCount: nextProps.histogramSettings.binCount,
      });
    }
  }
  render() {
    // console.log('BIN COUNT: ', this.props.histogramSettings.binCount);
    return (
      <div>
        <TextField
          value={this.state.binCount}
          floatingLabelText="count"
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              this.props.dispatch(actions.setBinCount(this.state.binCount));
            }
          }}
          onChange={(event, newValue) => { this.setState({ binCount: newValue }); }}
        />
        <Slider
          min={0}
          max={4}
          onChange={(event, newValue) => {
            const binCount = Math.round(10 ** newValue);
            console.log('SLIDER VALUE: ', binCount);
            this.props.dispatch(actions.setBinCount(binCount));
          }}
        />
        <TextField
          value={this.state.binWidth}
          floatingLabelText="width (to 6 significant digits)"
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              this.props.dispatch(actions.setBinWidth(this.state.binWidth));
            }
          }}
          onChange={(event, newValue) => {
            // const sciValue = newValue.toExponential(6);
            this.setState({ binWidth: newValue });
          }}
        />
        <br />
        <Checkbox
          label="outline"
          checked={this.props.displayType === 'lines'}
          onCheck={(event, isInputChecked) => {
            if (isInputChecked) {
              this.props.dispatch(actions.setDisplayType('lines'));
            }
          }}
        />
        <Checkbox
          label="fill"
          checked={this.props.displayType !== 'lines'}
          onCheck={(event, isInputChecked) => {
            if (isInputChecked) {
              this.props.dispatch(actions.setDisplayType('bar'));
            }
          }}
        />
        <Checkbox
          label="log"
          checked={this.props.histogramSettings.logCount}
          onCheck={(event, isInputChecked) => {
            if (isInputChecked) {
              this.props.dispatch(actions.setLogCount(true));
            } else {
              this.props.dispatch(actions.setLogCount(false));
            }
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  histogramSettings: state.HistogramSettingsDB.histogramSettings,
  displayType: state.HistogramDB.displayType,
});

export default connect(mapStateToProps)(HistogramDisplay);

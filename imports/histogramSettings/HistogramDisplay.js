import React, { Component } from 'react';
import { connect } from 'react-redux';
/* material-ui beta */
import TextField from 'material-ui-next/TextField';
import Checkbox from 'material-ui-next/Checkbox';
import { FormGroup, FormControlLabel } from 'material-ui-next/Form';
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
    return (
      <div>
        <TextField
          value={this.state.binCount}
          label="count"
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              this.props.dispatch(actions.setBinCount(this.state.binCount));
            }
          }}
          onChange={(event) => { this.setState({ binCount: event.target.value }); }}
          margin="normal"
        />
        {/* <TextField
          value={this.state.binCount}
          floatingLabelText="count"
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              this.props.dispatch(actions.setBinCount(this.state.binCount));
            }
          }}
          onChange={(event, newValue) => { this.setState({ binCount: newValue }); }}
        /> */}
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
          label="width"
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              this.props.dispatch(actions.setBinWidth(this.state.binWidth));
            }
          }}
          onChange={(event) => { this.setState({ binWidth: event.target.value }); }}
          margin="normal"
        />
        {/* <TextField
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
        /> */}
        <FormGroup row={false}>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.props.displayType === 'lines'}
                onChange={(event, isInputChecked) => {
                  if (isInputChecked) {
                    this.props.dispatch(actions.setDisplayType('lines'));
                  }
                }}
                value="lines"
              />
            }
            label="outline"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.props.displayType !== 'lines'}
                onChange={(event, isInputChecked) => {
                  if (isInputChecked) {
                    this.props.dispatch(actions.setDisplayType('bar'));
                  }
                }}
                value="bars"
              />
            }
            label="fill"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.props.histogramSettings.logCount}
                onChange={(event, isInputChecked) => {
                  if (isInputChecked) {
                    this.props.dispatch(actions.setLogCount(true));
                  } else {
                    this.props.dispatch(actions.setLogCount(false));
                  }
                }}
              />
            }
            label="log"
          />
        </FormGroup>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  histogramSettings: state.HistogramSettingsDB.histogramSettings,
  displayType: state.HistogramDB.displayType,
});

export default connect(mapStateToProps)(HistogramDisplay);

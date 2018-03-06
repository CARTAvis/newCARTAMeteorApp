import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import actions from './actions';

class HistogramSettings extends Component {
  constructor(props) {
    console.log('HISTOGRAM SETTINGS');
    super(props);
    this.state = {
      binWidth: this.props.histogramSettings.binWidth,
      binCount: this.props.histogramSettings.binCount,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.histogramSettings.binWidth !== this.props.histogramSettings.binWidth) {
      this.setState({
        binWidth: nextProps.histogramSettings.binWidth,
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
      <div style={{ flex: 1 }}>
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
        <br />
        <TextField
          value={this.props.histogramSettings.binWidth}
          disabled
          floatingLabelText="width (to 6 significant digits)"
          // onKeyDown={(e) => {
          //   if (e.keyCode === 13) {
          //     this.props.dispatch(actions.setBinWidth(this.state.binWidth));
          //   }
          // }}
          // onChange={(event, newValue) => { this.setState({ binWidth: newValue }); }}
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

export default connect(mapStateToProps)(HistogramSettings);

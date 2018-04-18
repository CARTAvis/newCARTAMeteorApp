import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import actions from '../actions';

class ProfilerProfileSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { profilerSettings } = this.props;
    const freqUnits = ['Hz', 'MHz', 'GHz'];
    const wavelenUnits = ['mm', 'um', 'nm', 'Angstrom'];
    let UnitsList = wavelenUnits.map(item => (
      <MenuItem value={item} primaryText={item} />
    ));
    let restFreq = 'Wavelength';
    if (profilerSettings.restFrequencyUnits) {
      restFreq = 'Frequency';
      UnitsList = freqUnits.map(item => (
        <MenuItem value={item} primaryText={item} />
      ));
    }
    return (
      <div>
        <SelectField
          floatingLabelText="Statistics"
          value={profilerSettings.stat}
          onChange={(event, index, value) => {
            this.props.dispatch(actions.setStatistic(value));
          }}
        >
          <MenuItem value="Mean" primaryText="Mean" />
          <MenuItem value="Median" primaryText="Median" />
          <MenuItem value="Sum" primaryText="Sum" />
          <MenuItem value="Variance" primaryText="Variance" />
          <MenuItem value="Minimum" primaryText="Minimum" />
          <MenuItem value="Maximum" primaryText="Maximum" />
          <MenuItem value="RMS" primaryText="RMS" />
          <MenuItem value="Flux Density" primaryText="Flux Density" />
        </SelectField>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 'initial' }}>
            <SelectField
              floatingLabelText="Rest Unit"
              value={restFreq}
              style={{ width: '100%' }}
              // onChange={(event, index, value) => {
              //   this.props.dispatch(actions.setStatistic(value));
              // }}
            >
              <MenuItem value="Frequency" primaryText="Frequency" />
              <MenuItem value="Wavelength" primaryText="Wavelength" />
            </SelectField>
          </div>
          <div style={{ flex: 'initial' }}>
            <TextField
              floatingLabelText="Value"
              style={{ width: '100%' }}
              onChange={(event, newValue) => {
                this.props.dispatch(actions.setTickLength(newValue));
              }}
              value={profilerSettings.restFrequency}
            />
          </div>
          <div style={{ flex: 'initial' }}>
            <SelectField
              floatingLabelText="Unit"
              value={profilerSettings.restUnits}
              style={{ width: '100%' }}
              // onChange={(event, index, value) => {
              //   this.props.dispatch(actions.setStatistic(value));
              // }}
            >
              { UnitsList }
            </SelectField>
          </div>
          <div style={{ flex: 'initial' }}>
            <RaisedButton label="Reset" style={{ margin: 12 }} />
            {/* <button style={{ bottom: 0 }} > reset </button> */}
          </div>
        </div>
      </div>
      // <div style={{ display: 'flex' }}>
      //   <div style={{ flex: 'initial' }}>
      //     <Subheader>Previous chats</Subheader>
      //   </div>
      //   <div style={{ flex: 'initial' }}>
      //     <RadioButtonGroup name="shipSpeed" valueSelected={restFreq} style={{ display: 'flex', width: '60%' }}>
      //       <RadioButton
      //         value="freq"
      //         label="Frequency"
      //         // style={styles.radioButton}
      //       />
      //       <RadioButton
      //         value="not_freq"
      //         label="Wavelength"
      //         // style={styles.radioButton}
      //       />
      //     </RadioButtonGroup>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = state => ({
  // profilerMainSetting: state.ProfilerDB.profilerMainSetting,
  profilerSettings: state.ProfilerDB.profilerSettings,
});

export default connect(mapStateToProps)(ProfilerProfileSetting);

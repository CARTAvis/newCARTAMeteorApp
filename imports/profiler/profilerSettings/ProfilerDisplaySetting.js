import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import actions from '../actions';

class ProfilerDisplaySetting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { profilerSettings } = this.props;
    return (
      <div>
        <SelectField
          floatingLabelText="Y Axis"
          value={profilerSettings.axisUnitsLeft}
          onChange={(event, index, value) => {
            this.props.dispatch(actions.setAxisUnitsLeft(value));
          }}
        >
          <MenuItem value="Jy/beam" primaryText="Jy/beam" />
          <MenuItem value="Jy/pixel" primaryText="Jy/pixel" />
          <MenuItem value="Jy/arcsec^2" primaryText="Jy/arcsec^2" />
          <MenuItem value="MJy/sr" primaryText="MJy/sr" />
          <MenuItem value="K" primaryText="K" />
        </SelectField>
        <SelectField
          floatingLabelText="X Axis"
          value={profilerSettings.axisUnitsBottom}
          onChange={(event, index, value) => {
            this.props.dispatch(actions.setAxisUnitsBottom(value));
          }}
        >
          <MenuItem value="Radio Velocity(km/s)" primaryText="Radio Velocity(km/s)" />
          <MenuItem value="Optical Velocity(m/s)" primaryText="Optical Velocity(m/s)" />
          <MenuItem value="Frequency(GHz)" primaryText="Freguency(GHz)" />
          <MenuItem value="Wavelength(nm)" primaryText="Wavelength(nm)" />
          <MenuItem value="Air Wavelength(um)" primaryText="Air Wavelength(um)" />
          <MenuItem value="Channel" primaryText="Channel" />
        </SelectField>
        <Toggle
          label="Grid Lines"
          toggled={profilerSettings.gridLines}
          onToggle={(event, newValue) => {
            this.props.dispatch(actions.setShowGridLines(newValue));
          }}
        />
        <Toggle
          label="Frame"
          toggled={profilerSettings.showFrame}
          onToggle={(event, newValue) => {
            this.props.dispatch(actions.setShowFrame(newValue));
          }}
        />
        <Toggle
          label="Cursor"
          toggled={profilerSettings.showCursor}
          onToggle={(event, newValue) => {
            this.props.dispatch(actions.setShowCursor(newValue));
          }}
        />
        <Toggle
          label="Legend"
          toggled={profilerSettings.legendShow}
          onToggle={(event, newValue) => {
            this.props.dispatch(actions.setLegendShow(newValue));
          }}
        />
        <Toggle
          label="External Legend"
          toggled={profilerSettings.legendExternal}
          disabled={!profilerSettings.legendShow}
          onToggle={(event, newValue) => {
            this.props.dispatch(actions.setLegendExternal(newValue));
          }}
        />
        <Toggle
          label="Show Legend Line"
          toggled={profilerSettings.legendLine}
          disabled={!profilerSettings.legendShow}
          onToggle={(event, newValue) => {
            this.props.dispatch(actions.setLegendLine(newValue));
          }}
        />
        <SelectField
          floatingLabelText="Legend Location"
          disabled={!profilerSettings.legendLine || !profilerSettings.legendShow}
          value={profilerSettings.legendLocation}
          onChange={(event, index, value) => {
            this.props.dispatch(actions.setLegendLocation(value));
          }}
        >
          <MenuItem value="Left" primaryText="Left" />
          <MenuItem value="Right" primaryText="Right" />
          <MenuItem value="Top" primaryText="Top" />
          <MenuItem value="Bottom" primaryText="Bottom" />
          <MenuItem value="Top Left" primaryText="Top Left" />
          <MenuItem value="Top Right" primaryText="Top Right" />
          <MenuItem value="Bottom Left" primaryText="Bottom Left" />
          <MenuItem value="Bottom Right" primaryText="Bottom Right" />
        </SelectField>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // profilerMainSetting: state.ProfilerDB.profilerMainSetting,
  profilerSettings: state.ProfilerDB.profilerSettings,
});

export default connect(mapStateToProps)(ProfilerDisplaySetting);

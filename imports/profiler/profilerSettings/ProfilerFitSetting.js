import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import NumericInput from 'react-numeric-input';
import actions from '../actions';

const numericInputStyle = {
  wrap: { height: '30px', width: '50px' },
  input: { height: '30px', width: '50px' },
};

class ProfilerFitSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { profileData, profilerSettings, fit, fitStats } = this.props;
    const curveNameList = [];
    const selectFitCurves = [];
    if (profileData) {
      profileData.forEach((element) => {
        curveNameList.push(element.name);
      });
      profileData.filter(element => element.fitSelect)
        .forEach((element) => {
          selectFitCurves.push(element.name);
        });
      // profileData.filter((element) => {
      //   element.fitSelect
      // }).forEach((element) => {
      //   selectFitCurves.push(element.name);
      // });
    }
    const curveNameMenuItem = curveNameList.map(item => (
      <MenuItem
        value={item}
        primaryText={item}
        checked={selectFitCurves && selectFitCurves.indexOf(item) > -1}
      />
    ));
    // bug: https://github.com/mui-org/material-ui/issues/1357
    // const curveNameListItem = curveNameList.map(item => (
    //   <ListItem value={item} primaryText={item} 
    //     leftCheckbox={<Checkbox />}
    //     onClick={() => {
    //       console.log('********************************', item);
    //       // this.props.dispatch(actions.setFitCurves(value));
    //     }}
    //   />
    // ));
    return (
      <div>
        <SelectField
          multiple
          floatingLabelText="Selected Curve for Fitting"
          value={selectFitCurves}
          onChange={(event, index, value) => {
            this.props.dispatch(actions.setFitCurves(value));
          }}
        >
          { curveNameMenuItem }
        </SelectField>
        <Subheader>Parameters</Subheader>
        <Divider />
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 'initial' }}>
            {/* <Subheader>Gaussian Count:</Subheader> */}
            <p>Gaussian Count:</p>
          </div>
          <div style={{ flex: 'initial' }}>
            <NumericInput
              min={0}
              max={100}
              value={fit.gaussCount}
              onChange={(event, value) => {
                this.props.dispatch(actions.setGaussCount(value));
              }}
              style={numericInputStyle}
            />
          </div>
          <div style={{ flex: 'initial' }}>
            {/* <Subheader>Polynomial Term:</Subheader> */}
            <p>Polynomial Term:</p>
          </div>
          <div style={{ flex: 'initial' }}>
            <NumericInput
              min={0}
              max={100}
              value={fit.polyDegree}
              // onChange={(event, value) => {
              //   this.props.dispatch(actions.setFontSize(value));
              // }}
              style={numericInputStyle}
            />
          </div>
        </div>
        <Toggle
          label="Random Heuristic"
          toggled={fit.heuristic}
          // onToggle={(event, newValue) => {
          //   this.props.dispatch(actions.setLegendExternal(newValue));
          // }}
        />
        <Subheader>Display</Subheader>
        <Divider />
        <Toggle
          label="Residual"
          toggled={profilerSettings.showResiduals}
          // onToggle={(event, newValue) => {
          //   this.props.dispatch(actions.setLegendExternal(newValue));
          // }}
        />
        <Toggle
          label="Statistics"
          toggled={profilerSettings.showStats}
          onToggle={(event, newValue) => {
            this.props.dispatch(actions.setShowStatistics(newValue));
          }}
        />
        <Toggle
          label="Mean and RMS"
          toggled={profilerSettings.showMeanRMS}
          // onToggle={(event, newValue) => {
          //   this.props.dispatch(actions.setLegendExternal(newValue));
          // }}
        />
        <Toggle
          label="Peak Labels"
          toggled={profilerSettings.showPeakLabels}
          // onToggle={(event, newValue) => {
          //   this.props.dispatch(actions.setLegendExternal(newValue));
          // }}
        />
        <Subheader>Statistics</Subheader>
        <Divider />
        <div>
          {/* {fitStats} */}
          {/* TODO: a temporary solution to show fit statistics,
          Try to reformat the m_stateFitStatistics in c++ */}
          { profilerSettings.showStats && <td dangerouslySetInnerHTML={{__html: fitStats }} /> }
        </div>
        {/* <List>
          <Subheader>Select Curve to Fit</Subheader>
          { curveNameListItem }
          <ListItem value="test" primaryText="test" leftCheckbox={<Checkbox />}
            onClick={(value) => {
              console.log('********************************', value);
              // this.props.dispatch(actions.setFitCurves(value));
            }}
          />
        </List> */}
        {/* <Divider /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // profilerMainSetting: state.ProfilerDB.profilerMainSetting,
  profilerSettings: state.ProfilerDB.profilerSettings,
  profileData: state.ProfilerDB.profileData,
  fit: state.ProfilerDB.fit,
  fitStats: state.ProfilerDB.fitStats,
});

export default connect(mapStateToProps)(ProfilerFitSetting);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import ProfilerSettings from '../app/ProfilerSettings';
import HistogramSettings from '../app/HistogramSettings';
import ImageSettings from '../imageSettings/ImageSettings';
import StatsSettings from '../statsSettings/StatsSettings';
import actions from './actions';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.show) {
      this.settingsBox.className = 'showSettingsUI';
    } else {
      this.settingsBox.className = 'hideSettingsUI';
    }
  }
  showSetting = () => {
    const { currentSetting } = this.props;
    let settingObj = null;
    if (currentSetting !== '') {
      // for (let i = 0; i < settingsArray.length; i += 1) {
      // if (settingsArray[i].type === currentSetting) {
      if (currentSetting === 'Profiler') settingObj = <ProfilerSettings />;
      else if (currentSetting === 'Histogram') settingObj = <HistogramSettings />;
      else if (currentSetting === 'Image') settingObj = <ImageSettings />;
      else if (currentSetting === 'Statistics') settingObj = <StatsSettings />;
    }
    return settingObj;
  }
  hide = () => {
    this.settingsBox.className = 'hideSettingsUI';
    this.props.dispatch(actions.clearAll());
  }
  showWithTabs = () => {
    const tabs = (
      <Tabs
        value={this.props.currentSetting}
        onChange={(newSetting) => { this.props.dispatch(actions.settingChanged(newSetting)); }}
      >
        {this.props.settingsArray.map(item =>
          (<Tab label={item.settingType} value={item.settingType} key={Math.floor(Math.random() * 100)}>
            {this.showSetting()}
          </Tab>),
        )}
      </Tabs>
    );
    return tabs;
  }
  render() {
    // if (this.props.show && this.settingsBox) {
    //   this.settingsBox.className = 'show';
    // } else if (!this.props.show && this.settingsBox) {
    //   this.hide();
    // }
    return (
      <div
        ref={(node) => { if (node) { this.settingsBox = node; } }}
        className="hideSettingsUI"
      >
        <RaisedButton
          onClick={this.hide}
          label="close"
        />
        {this.props.settingsArray.length > 1 ? this.showWithTabs() : this.showSetting()}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  settingsArray: state.SettingsDB.settingsArray,
  currentSetting: state.SettingsDB.currentSetting,
  show: state.SettingsDB.show,
});
export default connect(mapStateToProps)(Settings);

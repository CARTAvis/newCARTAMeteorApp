import React, { Component } from 'react';
import { connect } from 'react-redux';

/* material-ui beta */
// import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui-next/AppBar';
import Tabs, { Tab } from 'material-ui-next/Tabs';
import Button from 'material-ui-next/Button';

import HistogramSettings from '../histogramSettings/HistogramSettings';
import ProfilerSettings from '../profiler/profilerSettings/ProfilerSettings';
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
    const { currentSetting, settingsArray } = this.props;
    const tabs = (
      <div>
        <AppBar position="static">
          <Tabs
            value={currentSetting}
            onChange={(event, value) => { this.props.dispatch(actions.settingChanged(value)); }}
          >
            {settingsArray.map(item =>
              (<Tab label={item.settingType} value={item.settingType} key={Math.floor(Math.random() * 1000)} />))}
          </Tabs>
        </AppBar>
        {currentSetting === 'Profiler' && <ProfilerSettings />}
        {currentSetting === 'Histogram' && <HistogramSettings />}
        {currentSetting === 'Image' && <ImageSettings />}
        {currentSetting === 'Statistics' && <StatsSettings />}
      </div>
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
        <Button
          variant="raised"
          size="medium"
          onClick={this.hide}
        >
            close
        </Button>
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

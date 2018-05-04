import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import actions from '../actions';
import ProfilerDisplaySetting from './ProfilerDisplaySetting';
import ProfilerRangeSetting from './ProfilerRangeSetting';
import ProfilerProfileSetting from './ProfilerProfileSetting';
import ProfilerFitSetting from './ProfilerFitSetting';
import ProfilerCurveSetting from './ProfilerCurveSetting';

class ProfilerSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let currentProfilerSetting = null;
    if (this.props.profilerMainSetting) {
      switch (this.props.profilerMainSetting) {
        case 'display':
          currentProfilerSetting = <ProfilerDisplaySetting />;
          break;
        case 'range':
          currentProfilerSetting = <ProfilerRangeSetting />;
          break;
        case 'profile':
          currentProfilerSetting = <ProfilerProfileSetting />;
          break;
        case 'fit':
          currentProfilerSetting = <ProfilerFitSetting />;
          break;
        case 'curve':
          currentProfilerSetting = <ProfilerCurveSetting />;
          break;
        default:
          break;
      }
    }
    return (
      <div style={{ flex: 1 }}>
        <div className="rowLayout">
          <div className="settingsUISideMenu">
            <Menu
              onChange={(event, value) => {
                this.props.dispatch(actions.setProfilerMainSetting(value));
              }}
            >
              <MenuItem primaryText="display" value="display" />
              <MenuItem primaryText="range" value="range" />
              <MenuItem primaryText="profile" value="profile" />
              <MenuItem primaryText="fit" value="fit" />
              <MenuItem primaryText="curve" value="curve" />
            </Menu>
          </div>
          <div id="data" className="settingsUIContent">
            {currentProfilerSetting}
          </div>
        </div>
      </div>
    );
  }

  // render() {
  //   return (
  //     <div>
  //       <p>test</p>
  //     </div>
  //   );
  // }
}

const mapStateToProps = state => ({
  profilerMainSetting: state.ProfilerDB.profilerMainSetting,
  // profilerSettings: state.ProfilerDB.profilerSettings,
});

export default connect(mapStateToProps)(ProfilerSettings);

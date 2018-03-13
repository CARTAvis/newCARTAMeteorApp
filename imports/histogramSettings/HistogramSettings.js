import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import actions from './actions';
import HistogramDisplay from './HistogramDisplay';
import HistogramSelection from './HistogramSelection';

class HistogramSettings extends Component {
  constructor(props) {
    console.log('HISTOGRAM SETTINGS');
    super(props);
    this.state = {};
  }
  render() {
    let currentHistogramSetting = null;
    if (this.props.histogramMainSetting) {
      switch (this.props.histogramMainSetting) {
        case 'display':
          currentHistogramSetting = <HistogramDisplay />;
          break;
        case 'selection':
          currentHistogramSetting = <HistogramSelection />;
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
                this.props.dispatch(actions.setHistogramMainSetting(value));
              }}
            >
              <MenuItem primaryText="display" value="display" />
              <MenuItem primaryText="range" value="range" />
              <MenuItem primaryText="selection" value="selection" />
            </Menu>
          </div>
          <div id="data" className="settingsUIContent">
            {currentHistogramSetting}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  histogramMainSetting: state.HistogramSettingsDB.histogramMainSetting,
});

export default connect(mapStateToProps)(HistogramSettings);

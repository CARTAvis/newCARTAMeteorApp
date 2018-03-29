import React, { Component } from 'react';
import { connect } from 'react-redux';
/* material-ui beta */
import { MenuItem, MenuList } from 'material-ui-next/Menu';

// import Menu from 'material-ui/Menu';
// import MenuItem from 'material-ui/MenuItem';
import actions from './actions';
import HistogramDisplay from './HistogramDisplay';
import HistogramSelection from './HistogramSelection';

class HistogramSettings extends Component {
  constructor(props) {
    console.log('HISTOGRAM SETTINGS');
    super(props);
    this.state = {};
  }
  setHistogramMainSetting = type => () => {
    this.props.dispatch(actions.setHistogramMainSetting(type));
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
            <MenuList>
              <MenuItem onClick={this.setHistogramMainSetting('display')}>display</MenuItem>
              <MenuItem onClick={this.setHistogramMainSetting('selection')}>selection</MenuItem>
            </MenuList>
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

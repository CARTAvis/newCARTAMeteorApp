import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import GridControl from '../gridControl/GridControl';
import actions from './actions';

class ImageSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let currentImageSetting = null;
    if (this.props.mainSetting) {
      switch (this.props.mainSetting) {
        case 'grid':
          currentImageSetting = <GridControl />;
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
              onChange={(event, value) => { this.props.dispatch(actions.setMainSetting(value)); }}
            >
              <MenuItem
                primaryText="grid"
                rightIcon={<ArrowDropRight />}
                value="grid"
                menuItems={[
                  <MenuItem primaryText="canvas" onClick={() => { this.props.dispatch(actions.setSubSetting('canvas')); }} />,
                  <MenuItem primaryText="grid" onClick={() => { this.props.dispatch(actions.setSubSetting('grid')); }} />,
                  <MenuItem primaryText="axes/border" onClick={() => { this.props.dispatch(actions.setSubSetting('axes')); }} />,
                  <MenuItem primaryText="labels" onClick={() => { this.props.dispatch(actions.setSubSetting('labels')); }} />,
                  <MenuItem primaryText="ticks" onClick={() => { this.props.dispatch(actions.setSubSetting('ticks')); }} />,
                ]}
              />
              <MenuItem primaryText="contour" value="contour" />
              <MenuItem primaryText="stack" />
              <MenuItem primaryText="regions" />
            </Menu>
          </div>
          <div id="data" className="settingsUIContent">
            {currentImageSetting}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  mainSetting: state.ImageSettingsDB.mainSetting,
});
export default connect(mapStateToProps)(ImageSettings);

import React, { Component } from 'react';
import { connect } from 'react-redux';
/* material-ui beta */
import { MenuItem, MenuList } from 'material-ui-next/Menu';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui-next/transitions/Collapse';

// import Menu from 'material-ui/Menu';
// import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import GridControl from '../gridControl/GridControl';
import actions from './actions';

class ImageSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  setSubSetting = type => () => {
    this.props.dispatch(actions.setSubSetting(type));
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
            <MenuList>
              <MenuItem onClick={() => {
                this.setState({ open: !this.state.open });
                this.props.dispatch(actions.setMainSetting('grid'));
              }}
              >
              grid
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
              </MenuItem>
              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <MenuList>
                  <MenuItem id="settingsSubList" onClick={this.setSubSetting('canvas')}>canvas</MenuItem>
                  <MenuItem id="settingsSubList" onClick={this.setSubSetting('grid')}>grid</MenuItem>
                  <MenuItem id="settingsSubList" onClick={this.setSubSetting('axes')}>axes</MenuItem>
                  <MenuItem id="settingsSubList" onClick={this.setSubSetting('labels')}>labels</MenuItem>
                  <MenuItem id="settingsSubList" onClick={this.setSubSetting('ticks')}>ticks</MenuItem>
                </MenuList>
              </Collapse>
              <MenuItem>contour</MenuItem>
              <MenuItem>stack</MenuItem>
              <MenuItem>regions</MenuItem>
            </MenuList>
            {/* <Menu
              onChange={(event, value) => { this.props.dispatch(actions.setMainSetting(value)); }}
            >
              <MenuItem
                primaryText="grid"
                rightIcon={<ArrowDropRight />}
                value="grid"
                menuItems={[
                  <MenuItem primaryText="canvas" onClick={this.setSubSetting('canvas')} />,
                  <MenuItem primaryText="grid" onClick={this.setSubSetting('grid')} />,
                  <MenuItem primaryText="axes/border" onClick={this.setSubSetting('axes')} />,
                  <MenuItem primaryText="labels" onClick={this.setSubSetting('labels')} />,
                  <MenuItem primaryText="ticks" onClick={this.setSubSetting('ticks')} />,
                ]}
              />
              <MenuItem primaryText="contour" value="contour" />
              <MenuItem primaryText="stack" />
              <MenuItem primaryText="regions" />
            </Menu> */}
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

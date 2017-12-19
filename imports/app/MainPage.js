import 'react-resizable/css/styles.css';
import 'react-grid-layout/css/styles.css';
import 'react-contextmenu/public/styles.css';
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Card, CardText } from 'material-ui/Card';
import { ContextMenu, MenuItem, ContextMenuTrigger, SubMenu } from 'react-contextmenu';
import LayoutWrapper from '../splitterLayout/LayoutWrapper';
import Animator from '../animator/Animator';
// import Colormap from '../colormap/Colormap';

// import { Meteor } from 'meteor/meteor';
// import { Tracker } from 'meteor/tracker';
// import { connect } from 'react-redux';

// import '../api/methods';
// import { Responses } from '../api/Responses';

// const REQUEST_FILE_LIST = 'REQUEST_FILE_LIST';
// const SELECT_FILE_TO_OPEN = 'SELECT_FILE_TO_OPEN';

// import actions from './actions';

import FeatureContainer from '../featureContainer/FeatureContainer';
import ProfilerSettings from './ProfilerSettings';
import HistogramSettings from './HistogramSettings';
import SideMenu from './SideMenu';
import Topbar from './Topbar';
// import Region from './Region';
import Region from '../region/Region';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // expand: false,
      value: 3,
      setting: '',
      open: false,
      tabs: [],
    };
  }
  // define callback
  // onUpdate = (array) => {
  //   console.log('pannelgroup change: ', array);
  //   const newWidth = array[1].size;
  //   console.log('pannelgroup change2: ', newWidth);
  //
  //   // console.log('new width:', newWidth);
  //   this.setState({ secondColumnWidth: newWidth });
  //   // use 2nd column's width
  // }
  onUpdate = (second) => {
    this.setState({ secondColumnWidth: second });
  }
  setSetting = (type) => {
    // add new settings to a new tab
    this.setState(prevState => ({ tabs: prevState.tabs.concat(type) }));
    // set new settings
    this.setState({ setting: type });
    if (this.state.tabs.length === 0) {
      // show settings
      this.show();
    }
  }
  settingChanged = (value) => {
    this.setState({ setting: value });
  }
  removeSetting = (type) => {
    if (this.state.tabs.length === 1) {
      this.hide();
    } else {
      let index = 0;
      for (let i = 0; i < this.state.tabs.length; i += 1) {
        if (this.state.tabs[i] === type) {
          if (i === this.state.tabs.length - 1) index = i - 1;
          else index = i + 1;
        }
      }
      this.setState(prevState => ({
        tabs: prevState.tabs.filter(item => item !== type),
        setting: prevState.tabs[index],
      }));
    }
  }
  handleClick = (e, data) => {
    this.grid.getWrappedInstance().onAddItem(data.type);
  }
  handleClick2 = (type) => {
    this.grid.getWrappedInstance().onAddItem(type);
  }
  handleChange = (event, index, value) => this.setState({ value });
  handleExpand = () => {
    this.setState({ expand: !this.state.expand });
  }
  expandToTrue = () => {
    this.setState({ expand: true });
  }
  showSetting = (setting) => {
    if (setting) {
      if (setting === 'Profiler') return <ProfilerSettings />;
      else if (setting === 'Histogram') return <HistogramSettings />;
      return 0;
    }
    return '';
  }
  drage2ndeHandler = (first, second, third) => {
    console.log('drage2nd handler:', first, ';second:', second, ';third:', third);
  }

  drage1stHandler = (first, second, third) => {
    console.log('drage1st handler:', first, ';second:', second, ';third:', third);
  }

  resizeHandler = (first, second, third) => {
    console.log('mount handler:', first, ';second:', second, ';third:', third);
  }

  resizeHandler = (first, second, third) => {
    console.log('resize handler:', first, ';second:', second, ';third:', third);
  }
  show = () => {
    const box2 = document.getElementById('hid-box');
    box2.className = 'show';
  }
  hide = () => {
    const box2 = document.getElementById('hid-box');
    box2.className = 'hide';
    this.setState({ tabs: [] });
  }
  render() {
    // console.log('IN RENDER');
    const toolbarStyle = {
      backgroundColor: '#EEEEEE',
      bottom: 0,
      width: '100%',
    };
    // const expanded = this.state.expand;
    const setting = this.state.setting;
    const midPanel = (
      <div>
        <div>
          <ContextMenuTrigger id="menu">
            <FeatureContainer
              ref={(node) => { if (node) this.grid = node; }}
              width={this.state.secondColumnWidth}
              setSetting={this.setSetting}
              removeSetting={this.removeSetting}
            />
          </ContextMenuTrigger>
        </div>
        <ContextMenu id="menu">
          <SubMenu title="Layout" hoverDelay={100}>
            <MenuItem onClick={this.handleClick} data={{ type: 'Profiler' }}>Profiler</MenuItem>
            <MenuItem onClick={this.handleClick} data={{ type: 'Histogram' }}>Histogram</MenuItem>
          </SubMenu>
        </ContextMenu>
      </div>
    );
    const tabs = (
      <Tabs
        value={this.state.setting}
        onChange={this.settingChanged}
      >
        {this.state.tabs.map(value => <Tab label={value} value={value} key={Math.floor(Math.random() * 100)} />)}
      </Tabs>
    );
    const content = (
      <Card
        style={{ width: 600, height: 450 }}
      >
        <RaisedButton
          onClick={this.hide}
          label="close"
        />
        {this.state.tabs.length > 1 ? tabs : false}
        <CardText>
          {this.showSetting(setting)}
        </CardText>
      </Card>
    );
    return (
      <div className="layout-row">
        <SideMenu
          // expandToTrue={this.expandToTrue}
          // handleExpand={this.handleExpand}
          // expand={this.state.expand}
          handleLogout={this.props.handleLogout}
        />
        <div id="hid-box" className="hide">
          {content}
        </div>
        <div className="layout-fill">
          <Topbar style={toolbarStyle} />
          <LayoutWrapper
            firstPercentage={50}
            secondPercentage={50}
            mountHandler={this.mountHandler}
            resizeHandler={this.resizeHandler}
            drage1stHandler={this.drage1stHandler}
            drage2ndeHandler={this.drage2ndeHandler}
            onUpdate={this.onUpdate}
          >
            <div>
              {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Region />
                <Region />
                <Region />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Region />
                <Region />
                <Region />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Region />
                <Region />
                <Region />
              </div> */}
              <Region />
              <br />
              <Animator />
            </div>
            <div>
              <div style={{ marginLeft: '30%', marginTop: '10px' }}>
                <RaisedButton
                  style={{ marginLeft: '10px' }}
                  onClick={() => this.handleClick2('Profiler')}
                >
                  <img style={{ width: '40px', height: '25px' }} src="/images/line.svg" alt="" />
                </RaisedButton>
                <RaisedButton
                  style={{ marginLeft: '10px' }}
                  onClick={() => this.handleClick2('Histogram')}
                >
                  <img style={{ width: '40px', height: '25px' }} src="/images/histogram.png" alt="" />
                </RaisedButton>
              </div>
              {/* experimental place for colormap */}
              {/* <Colormap /> */}
              {midPanel}
            </div>
          </LayoutWrapper>
        </div>
      </div>
    );
  }
}

export default MainPage;

/* TODO: export function mapDispatchToProps(dispatch)
 return bindActionCreators({
prepareFileBrowser: actions.prepareFileBrowser,
}, dispatch);
}
export default connect(mapStateToPropsListPage)(FileBrowser); */

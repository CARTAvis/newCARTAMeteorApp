import React, { Component } from 'react';
/* material-ui beta */
import Button from 'material-ui-next/Button';
// import RaisedButton from 'material-ui/RaisedButton';
import { ContextMenu, MenuItem, ContextMenuTrigger, SubMenu } from 'react-contextmenu';
import 'react-resizable/css/styles.css';
import 'react-grid-layout/css/styles.css';
// import 'react-contextmenu/public/styles.css';
import '../styles/react-contextmenu.css';
import LayoutWrapper from '../splitterLayout/LayoutWrapper';
import Animator from '../animator/Animator';
// import { Meteor } from 'meteor/meteor';
// import { Tracker } from 'meteor/tracker';
// import { connect } from 'react-redux';

// import '../api/methods';
// import { Responses } from '../api/Responses';

// const REQUEST_FILE_LIST = 'REQUEST_FILE_LIST';
// const SELECT_FILE_TO_OPEN = 'SELECT_FILE_TO_OPEN';

// import actions from './actions';

import FeatureContainer from '../featureContainer/FeatureContainer';
import Settings from '../settings/Settings';
import FileBrowser from '../fileBrowser/FileBrowser';
// import SideMenu from './SideMenu';
import Topbar from '../topbar/Topbar';
// import FeatureContainerActions from '../featureContainer/actions';
// import Region from './Region';
import Region from '../region/Region';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // expand: false,
      open: false,
    };
  }
  componentDidMount = () => {
    if (this.grid) {
      this.grid.getWrappedInstance().onAddItem('Statistics');
    }
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
  onUpdate = (first, second) => {
    this.setState({
      firstColumnWidth: first,
      secondColumnWidth: second,
    });
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
  render() {
    console.log('IN RENDER');
    const midPanel = (
      <div>
        <div>
          <ContextMenuTrigger id="menu">
            <FeatureContainer
              ref={(node) => { if (node) this.grid = node; }}
              width={this.state.secondColumnWidth}
            />
          </ContextMenuTrigger>
        </div>
        <ContextMenu id="menu">
          <SubMenu title="Layout" hoverDelay={100}>
            <MenuItem onClick={this.handleClick} data={{ type: 'Profiler' }}>Profiler</MenuItem>
            <MenuItem onClick={this.handleClick} data={{ type: 'Histogram' }}>Histogram</MenuItem>
            <MenuItem onClick={this.handleClick} data={{ type: 'Statistics' }}>Statistics</MenuItem>
          </SubMenu>
        </ContextMenu>
      </div>
    );
    return (
      <div className="layout-row">
        {/* <SideMenu
          // expandToTrue={this.expandToTrue}
          // handleExpand={this.handleExpand}
          // expand={this.state.expand}
          handleLogout={this.props.handleLogout}
        /> */}
        <div className="layout-fill">
          <Topbar
            handleLogout={this.props.handleLogout}
          />
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
              <Region firstColumnWidth={this.state.firstColumnWidth} />
              <Animator firstColumnWidth={this.state.firstColumnWidth} />
            </div>
            <div>
              <div style={{ marginLeft: '30%', marginTop: '10px' }}>
                <Button
                  variant="raised"
                  size="medium"
                  style={{ marginLeft: '10px' }}
                  onClick={() => this.handleClick2('Profiler')}
                >
                  <img style={{ width: '40px', height: '25px' }} src="/images/line.svg" alt="" />
                </Button>
                <Button
                  variant="raised"
                  size="medium"
                  style={{ marginLeft: '10px' }}
                  onClick={() => this.handleClick2('Histogram')}
                >
                  <img style={{ width: '40px', height: '25px' }} src="/images/histogram.png" alt="" />
                </Button>
                {/* <RaisedButton
                  style={{ marginLeft: '10px' }}
                  onClick={() => this.handleClick2('Profiler')}
                >
                  <img style={{ width: '40px', height: '25px' }} src="/images/line.svg" alt="" />
                </RaisedButton> */}
                {/* <RaisedButton
                  style={{ marginLeft: '10px' }}
                  onClick={() => this.handleClick2('Histogram')}
                >
                  <img style={{ width: '40px', height: '25px' }} src="/images/histogram.png" alt="" />
                </RaisedButton> */}
              </div>
              {midPanel}
            </div>
          </LayoutWrapper>
        </div>
        <Settings />
        <FileBrowser />
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

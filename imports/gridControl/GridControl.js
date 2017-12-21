import React, { Component } from 'react';
import actions from './actions';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
// import NumericInput from 'react-numeric-input';
// import Slider from 'material-ui/Slider';

const Canvas = 'Canvas';
const Grid = 'Grid';
const AxesBorder = 'Axes/Border';
const Labels = 'Labels';
const Ticks = 'Ticks';

class GridControl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.props.dispatch(actions.setupAnimator());
  }

  render() {
    const { dataGrid } = this.props;
    console.log("Test to get dataGrid from Redux", dataGrid);
    // const currentSkyCoordinateSystem = dataGrid.skyCS;

    let menuItems = [];
    let currentSkyCoordinateSystem='';
    if (dataGrid) {
      currentSkyCoordinateSystem = dataGrid.skyCS;
      menuItems.push(<MenuItem value={1} key={1} primaryText={currentSkyCoordinateSystem} />);
    }

    return (
      <div>
        <Paper style={{ width: 482, height: 200, backgroundColor: 'lightgrey' }} zDepth={2}>
          <Tabs>
            <Tab label={Canvas} />
            <Tab label={Grid} />
            <Tab label={AxesBorder} />
            <Tab label={Labels} />
            <Tab label={Ticks} />
          </Tabs>
          <div style={{ display: 'flex', flexDirection: 'row', height: '20%' }}>
            <DropDownMenu
              value={currentSkyCoordinateSystem}
              underlineStyle={{ color: 'black' }}
            //   onChange={this.changeSkyCoordinateSystem}
            >
              {menuItems}
            </DropDownMenu>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataGrid: state.GridDB.DataGrid,
//   animatorTypeList: state.AnimatorDB.animatorTypeList,
//   currentAnimatorType: state.AnimatorDB.currentAnimatorType,
});

export default connect(mapStateToProps)(GridControl);

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
    // const { dataGrid } = this.props;
    // const currentskyCoorinateSystem = dataGrid.skyCS;

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
          {/* <div style={{ display: 'flex', flexDirection: 'row', height: '20%' }}>
            <DropDownMenu
              underlineStyle={{ color: 'black' }}
              onChange={this.changeFrame}
            >
              {menuItems}
            </DropDownMenu>
          </div> */}
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import NumericInput from 'react-numeric-input';
import actions from './actions';

// import NumericInput from 'react-numeric-input';
// import Slider from 'material-ui/Slider';
const numericInputStyle = {
  wrap: { height: '30px', width: '50px' },
  input: { height: '30px', width: '50px' },
};
class GridControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // coordinateSystem: this.props.dataGrid.skyCS,
      useDefaultCoordinateSystem: true,
      coords: [],
      // length: this.props.dataGrid.tickLength,
      thickness: 1,
      opacity: 255,
      axes: [],
      family: this.props.dataGrid.font.family,
      // fontSize: this.props.dataGrid.font.size,
      // precision: this.props.dataGrid.decimals,
      // xValue: this.props.dataGrid.xAxis,
      // yValue: this.props.dataGrid.yAxis,
      labelLeft: this.props.dataGrid.labelFormats.left.format,
      labelRight: this.props.dataGrid.labelFormats.right.format,
      labelTop: this.props.dataGrid.labelFormats.top.format,
      labelBottom: this.props.dataGrid.labelFormats.bottom.format,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const option = nextProps.option;
    if (option) {
      this.setState({ option });
    }
    // if (nextProps.dataGrid.skyCS) {
    //   this.setState({ coordinateSystem: nextProps.dataGrid.skyCS });
    // }
    if (nextProps.dataGrid.supportedCS) {
      const supportedCS = nextProps.dataGrid.supportedCS;
      for (let i = 0; i < supportedCS.length; i += 1) {
        this.setState(prevState => ({
          coords: prevState.coords.concat(
            <MenuItem value={supportedCS[i]} primaryText={supportedCS[i]} key={i} />),
        }));
      }
    }
    if (nextProps.dataGrid.supportedAxes) {
      const supportedAxes = nextProps.dataGrid.supportedAxes;
      for (let i = 0; i < supportedAxes.length; i += 1) {
        this.setState(prevState => ({
          axes: prevState.axes.concat(
            <MenuItem value={supportedAxes[i]} primaryText={supportedAxes[i]} key={i} />),
        }));
      }
    }
    // if (nextProps.dataGrid.xAxis || nextProps.dataGrid.yAxis) {
    //   this.setState({
    //     xValue: nextProps.dataGrid.xAxis,
    //     yValue: nextProps.dataGrid.yAxis,
    //   });
    // }
    if (this.props.dataGrid.labelFormats) {
      console.log(this.props.dataGrid.labelFormats.left);
    }
  }
  setLabelLeftRightOptions = () => (<div>
    <MenuItem value="Hr:Min:Sec" primaryText="Hr:Min:Sec" />
    <MenuItem value="Decimal Degrees" primaryText="Decimal Degrees" />
    <MenuItem value="Default" primaryText="Default" />
    <MenuItem value="No Label" primaryText="No Label" />
  </div>)
  setLabelTopBottomOptions = () => (<div>
    <MenuItem value="Deg:Min:Sec" primaryText="Deg:Min:Sec" />
    <MenuItem value="Decimal Degrees" primaryText="Decimal Degrees" />
    <MenuItem value="Default" primaryText="Default" />
    <MenuItem value="No Label" primaryText="No Label" />
  </div>)
  // handleCoordinateSystemChange = (event, index, value) => {
  //   this.props.dispatch(actions.setCoordinateSystem(value));
  // }
  handleXValChange = (event, index, value) => {
    // this.setState({ xValue: value });
    this.props.dispatch(actions.setAxisX(value));
  }
  handleYValChange = (event, index, value) => {
    this.setState({ yValue: value });
  }
  handleFontChange = (event, index, value) => {
    this.setState({ family: value });
  }
  handleLabelLeft = (event, index, value) => {
    if (this.state.labelRight !== 'No Label') {
      this.setState({ labelRight: 'No Label' });
    }
    this.setState({ labelLeft: value });
  }
  handleLabelRight = (event, index, value) => {
    if (this.state.labelLeft !== 'No Label') {
      this.setState({ labelLeft: 'No Label' });
    }
    this.setState({ labelRight: value });
  }
  handleLabelTop = (event, index, value) => {
    if (this.state.labelBottom !== 'No Label') {
      this.setState({ labelBottom: 'No Label' });
    }
    this.setState({ labelTop: value });
  }
  handleLabelBottom = (event, index, value) => {
    if (this.state.labelTop !== 'No Label') {
      this.setState({ labelTop: 'No Label' });
    }
    this.setState({ labelBottom: value });
  }
  display = () => {
    let content = null;
    // console.log('INSIDE DISPLAY');
    if (this.state.option === 'canvas') {
      content =
      (<div>
        <Toggle
          label="Show Coordinate System"
          toggled={this.props.dataGrid.showCoordinateSystem}
          style={{ marginBottom: 16 }}
          onToggle={(event, newValue) => {
            this.props.dispatch(actions.setShowCoordinateSystem(newValue));
          }}
        />
        <Toggle
          label="Use Default Coordinate System"
          toggled={this.state.useDefaultCoordinateSystem}
          style={{ marginBottom: 16 }}
          // onToggle={(event, newValue) => {
          //   this.props.dispatch(actions.setShowTicks(newValue));
          // }}
        />
        <SelectField
          floatingLabelText="Current Coordinate System"
          value={this.props.dataGrid.skyCS}
          disabled={this.state.useDefaultCoordinateSystem}
          onChange={(event, index, value) => {
            this.props.dispatch(actions.setCoordinateSystem(value));
          }}
        >
          {this.state.coords.map(item => item)}
        </SelectField>
      </div>);
    } else if (this.state.option === 'grid') {
      content =
        (<div>
          <Toggle
            label="Show Grid Lines"
            toggled={this.props.dataGrid.showGridLines}
            style={{ marginBottom: 16 }}
            onToggle={(event, newValue) => {
              this.props.dispatch(actions.setShowGridLines(newValue));
            }}
          />
          <TextField
            floatingLabelText="length"
            onChange={(event, newValue) => this.setState({ length: newValue })}
            value={this.state.length}
            // defaultValue={}
          />
          <Slider
            min={0}
            max={1}
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setGridSpacing(newValue));
            }}
            value={this.props.dataGrid.spacing}
            step={0.01}
          />
          <TextField
            floatingLabelText="thickness"
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setGridThickness(newValue));
            }}
            value={this.props.dataGrid.grid.width}
            // defaultValue={1}
          />
          <Slider
            min={1}
            max={10}
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setGridThickness(newValue));
            }}
            value={this.props.dataGrid.grid.width}
            step={1}
          />
          <TextField
            floatingLabelText="opacity"
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setGridTransparency(newValue));
            }}
            value={this.props.dataGrid.grid.alpha}
          />
          <Slider
            min={0}
            max={255}
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setGridTransparency(newValue));
            }}
            value={this.props.dataGrid.grid.alpha}
            step={1}
          />
        </div>);
    } else if (this.state.option === 'axes') {
      content = (
        <div>
          <Toggle
            label="Show Axes/Border"
            toggled={this.props.dataGrid.showAxis}
            style={{ marginBottom: 16 }}
            onToggle={(event, newValue) => {
              this.props.dispatch(actions.setShowAxis(newValue));
            }}
          />
          <Toggle
            label="Use Internal Axes"
            toggled={this.state.useDefaultCoordinateSystem}
            style={{ marginBottom: 16 }}
            // onToggle={(event, newValue) => {
            //   this.props.dispatch(actions.setShowTicks(newValue));
            // }}
          />
          {/* <Checkbox
            label="Axes/Border"
            style={{ width: 150 }}
            defaultChecked={this.props.dataGrid.showAxis}
          />
          <Checkbox
            label="Internal Axes"
            style={{ width: 150 }}
            defaultChecked={this.props.dataGrid.showInternalLabels}
          /> */}
          <TextField
            floatingLabelText="thickness"
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setAxesThickness(newValue));
            }}
            value={this.props.dataGrid.axes.width}
            // defaultValue={1}
          />
          <Slider
            min={1}
            max={10}
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setAxesThickness(newValue));
            }}
            value={this.props.dataGrid.axes.width}
            step={1}
          />
          <TextField
            floatingLabelText="opacity"
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setAxesTransparency(newValue));
            }}
            value={this.props.dataGrid.axes.alpha}
            // defaultValue={1}
          />
          <Slider
            min={0}
            max={255}
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setAxesTransparency(newValue));
            }}
            value={this.props.dataGrid.axes.alpha}
            step={1}
          />
          <p>X Axis: </p>
          <DropDownMenu
            value={this.props.dataGrid.xAxis}
            onChange={this.handleXValChange}
          >
            {this.state.axes.map(item => item)}
          </DropDownMenu>
          <p>Y Axis: </p>
          <DropDownMenu
            value={this.props.dataGrid.yAxis}
            onChange={this.handleYValChange}
          >
            {this.state.axes.map(item => item)}
          </DropDownMenu>

        </div>
      );
    } else if (this.state.option === 'labels') {
      const LeftRightMenu = this.setLabelLeftRightOptions();
      const TopBottomMenu = this.setLabelTopBottomOptions();
      content = (
        <div>
          <p>Family: </p>
          <DropDownMenu
            value={this.state.family}
            onChange={this.handleFontChange}
          >
            <MenuItem value="Helvetica" primaryText="Helvetica" />
            <MenuItem value="Times New Roman" primaryText="Times New Roman" />
            <MenuItem value="Courier New" primaryText="Courier New" />
          </DropDownMenu>
          <NumericInput
            min={0}
            max={20}
            value={this.props.dataGrid.font.size}
            onChange={(event, value) => {
              this.props.dispatch(actions.setFontSize(value));
            }}
            style={numericInputStyle}
          />
          <NumericInput
            min={0}
            max={this.props.dataGrid.decimalsMax}
            value={this.props.dataGrid.decimals}
            onChange={(event, value) => {
              this.props.dispatch(actions.setLabelDecimals(value));
            }}
            style={numericInputStyle}
          />
          <p>Left: </p>
          <DropDownMenu
            value={this.state.labelLeft}
            onChange={this.handleLabelLeft}
          >
            {LeftRightMenu}
          </DropDownMenu>
          <p>Right: </p>
          <DropDownMenu
            value={this.state.labelRight}
            onChange={this.handleLabelRight}
          >
            {LeftRightMenu}
          </DropDownMenu>
          <p>Top: </p>
          <DropDownMenu
            value={this.state.labelTop}
            onChange={this.handleLabelTop}
          >
            {TopBottomMenu}
          </DropDownMenu>
          <p>Bottom: </p>
          <DropDownMenu
            value={this.state.labelBottom}
            onChange={this.handleLabelBottom}
          >
            {TopBottomMenu}
          </DropDownMenu>
        </div>
      );
    } else if (this.state.option === 'ticks') {
      content =
        (<div>
          <Toggle
            label="Show Ticks"
            toggled={this.props.dataGrid.showTicks}
            style={{ marginBottom: 16 }}
            onToggle={(event, newValue) => {
              this.props.dispatch(actions.setShowTicks(newValue));
            }}
          />
          <TextField
            floatingLabelText="length"
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setTickLength(newValue));
            }}
            value={this.props.dataGrid.tickLength}
            // defaultValue={}
          />
          <Slider
            min={0}
            max={50}
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setTickLength(newValue));
            }}
            value={this.props.dataGrid.tickLength}
            step={1}
          />
          <TextField
            floatingLabelText="thickness"
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setTickThickness(newValue));
            }}
            value={this.props.dataGrid.tick.width}
            // defaultValue={1}
          />
          <Slider
            min={1}
            max={10}
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setTickThickness(newValue));
            }}
            value={this.props.dataGrid.tick.width}
            step={1}
          />
          <TextField
            floatingLabelText="opacity"
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setTickTransparency(newValue));
            }}
            value={this.props.dataGrid.tick.alpha}
          />
          <Slider
            min={0}
            max={255}
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setTickTransparency(newValue));
            }}
            value={this.props.dataGrid.tick.alpha}
            step={1}
          />
        </div>);
    }
    return content;
    // this.props.getContent(a);
  }
  render() {
    // const { dataGrid } = this.props;
    // const currentskyCoorinateSystem = dataGrid.skyCS;
    return (
      <div>
        {this.display()}
        {/* <MenuItem primaryText="canvas" />
        <MenuItem primaryText="grid" />
        <MenuItem primaryText="axes/border" />
        <MenuItem primaryText="labels" />
        <MenuItem primaryText="ticks" onClick={this.setTicks} /> */}
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

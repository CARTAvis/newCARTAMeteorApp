import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';
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
      length: this.props.dataGrid.tickLength,
      thickness: 1,
      opacity: 255,
      axes: [],
      family: this.props.dataGrid.font.family,
      fontSize: this.props.dataGrid.font.size,
      precision: this.props.dataGrid.decimals,
      xValue: this.props.dataGrid.xAxis,
      yValue: this.props.dataGrid.yAxis,
      labelLeft: this.props.dataGrid.labelFormats.left.format,
      labelRight: this.props.dataGrid.labelFormats.right.format,
      labelTop: this.props.dataGrid.labelFormats.top.format,
      labelBottom: this.props.dataGrid.labelFormats.bottom.format,
    };
    // this.props.dispatch(actions.setupAnimator());
  }
  componentWillReceiveProps = (nextProps) => {
    const option = nextProps.option;
    if (option) {
      this.setState({ option });
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
  handleXValChange = (event, index, value) => {
    this.setState({ xValue: value });
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
    if (this.state.option === 'ticks') {
      content =
        (<div>
          <Checkbox
            label="Show Ticks"
            style={{ width: 150 }}
            defaultChecked={this.props.dataGrid.showTicks}
          />
          <TextField
            floatingLabelText="length"
            onChange={(event, newValue) => this.setState({ length: newValue })}
            value={this.state.length}
            // defaultValue={}
          />
          <Slider
            min={0}
            max={50}
            onChange={(event, newValue) => this.setState({ length: newValue })}
            value={this.state.length}
            step={1}
          />
          <TextField
            floatingLabelText="thickness"
            onChange={(event, newValue) => this.setState({ thickness: newValue })}
            value={this.state.thickness}
            // defaultValue={1}
          />
          <Slider
            min={1}
            max={10}
            onChange={(event, newValue) => this.setState({ thickness: newValue })}
            value={this.state.thickness}
            step={1}
          />
          <TextField
            floatingLabelText="opacity"
            onChange={(event, newValue) => this.setState({ opacity: newValue })}
            value={this.state.opacity}
            // defaultValue={1}
          />
          <Slider
            min={0}
            max={255}
            onChange={(event, newValue) => this.setState({ opacity: newValue })}
            value={this.state.opacity}
            step={1}
          />
        </div>);
    } else if (this.state.option === 'labels') {
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
            value={this.state.fontSize}
            style={numericInputStyle}
          />
          <NumericInput
            min={0}
            max={this.props.dataGrid.decimalsMax}
            value={this.state.precision}
            style={numericInputStyle}
          />
          <p>Left: </p>
          <DropDownMenu
            value={this.state.labelLeft}
            onChange={this.handleLabelLeft}
          >
            {this.setLabelLeftRightOptions()}
          </DropDownMenu>
          <p>Right: </p>
          <DropDownMenu
            value={this.state.labelRight}
            onChange={this.handleLabelRight}
          >
            {this.setLabelLeftRightOptions()}
          </DropDownMenu>
          <p>Top: </p>
          <DropDownMenu
            value={this.state.labelTop}
            onChange={this.handleLabelTop}
          >
            {this.setLabelTopBottomOptions()}
          </DropDownMenu>
          <p>Bottom: </p>
          <DropDownMenu
            value={this.state.labelBottom}
            onChange={this.handleLabelBottom}
          >
            {this.setLabelTopBottomOptions()}
          </DropDownMenu>
        </div>
      );
    } else if (this.state.option === 'axes') {
      content = (
        <div>
          <Checkbox
            label="Axes/Border"
            style={{ width: 150 }}
            defaultChecked={this.props.dataGrid.showAxis}
          />
          <Checkbox
            label="Internal Axes"
            style={{ width: 150 }}
            defaultChecked={this.props.dataGrid.showInternalLabels}
          />
          <TextField
            floatingLabelText="thickness"
            onChange={(event, newValue) => this.setState({ thickness: newValue })}
            value={this.state.thickness}
            // defaultValue={1}
          />
          <Slider
            min={1}
            max={10}
            onChange={(event, newValue) => this.setState({ thickness: newValue })}
            value={this.state.thickness}
            step={1}
          />
          <TextField
            floatingLabelText="opacity"
            onChange={(event, newValue) => this.setState({ opacity: newValue })}
            value={this.state.opacity}
            // defaultValue={1}
          />
          <Slider
            min={0}
            max={255}
            onChange={(event, newValue) => this.setState({ opacity: newValue })}
            value={this.state.opacity}
            step={1}
          />
          <p>X Axis: </p>
          <DropDownMenu
            value={this.state.xValue}
            onChange={this.handleXValChange}
          >
            {this.state.axes.map(item => item)}
          </DropDownMenu>
          <p>Y Axis: </p>
          <DropDownMenu
            value={this.state.yValue}
            onChange={this.handleYValChange}
          >
            {this.state.axes.map(item => item)}
          </DropDownMenu>

        </div>
      );
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

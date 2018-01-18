import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const option = nextProps.option;
    if (option) {
      this.setState({ option });
    }
    if (this.props.dataGrid.labelFormats) {
      console.log(this.props.dataGrid.labelFormats.left);
    }
  }
  display = () => {
    let content = null;
    // console.log('INSIDE DISPLAY');
    if (this.state.option === 'canvas') {
      const coordinateSystems = [];
      const supportedCS = this.props.dataGrid.supportedCS;
      for (let i = 0; i < supportedCS.length; i += 1) {
        coordinateSystems.push(
          <MenuItem value={supportedCS[i]} primaryText={supportedCS[i]} key={i} />);
      }

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
          toggled={this.props.dataGrid.showDefaultCS}
          style={{ marginBottom: 16 }}
          onToggle={(event, newValue) => {
            this.props.dispatch(actions.setShowDefaultCoordinateSystem(newValue));
          }}
        />
        <SelectField
          floatingLabelText="Current Coordinate System"
          value={this.props.dataGrid.skyCS}
          disabled={this.props.dataGrid.showDefaultCS}
          onChange={(event, index, value) => {
            this.props.dispatch(actions.setCoordinateSystem(value));
          }}
        >
          {coordinateSystems}
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
            floatingLabelText="spacing"
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setGridSpacing(newValue));
            }}
            value={this.props.dataGrid.spacing}
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
      const axes = [];
      const supportedAxes = this.props.dataGrid.supportedAxes;
      for (let i = 0; i < supportedAxes.length; i += 1) {
        axes.push(
          <MenuItem value={supportedAxes[i]} primaryText={supportedAxes[i]} key={i} />);
      }

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
            toggled={this.props.dataGrid.showInternalLabels}
            style={{ marginBottom: 16 }}
            onToggle={(event, newValue) => {
              this.props.dispatch(actions.setShowInternalLabels(newValue));
            }}
          />
          <TextField
            floatingLabelText="thickness"
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setAxesThickness(newValue));
            }}
            value={this.props.dataGrid.axes.width}
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
          <SelectField
            floatingLabelText="X Axis"
            value={this.props.dataGrid.xAxis}
            onChange={(event, index, value) => {
              this.props.dispatch(actions.setAxisX(value));
            }}
          >
            {axes}
          </SelectField>
          <SelectField
            floatingLabelText="Y Axis"
            value={this.props.dataGrid.yAxis}
            onChange={(event, index, value) => {
              this.props.dispatch(actions.setAxisY(value));
            }}
          >
            {axes}
          </SelectField>
        </div>
      );
    } else if (this.state.option === 'labels') {
      content = (
        <div>
          <p>Family: </p>
          <DropDownMenu
            value={this.props.dataGrid.font.family}
            onChange={(event, key, value) => {
              this.props.dispatch(actions.setFontFamily(value));
            }}
          >
            {/* TODO: the hard code may be imporoved */}
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
            value={this.props.dataGrid.labelFormats.left.format}
            onChange={(event, key, value) => {
              this.props.dispatch(actions.setGridLabelFormat(value, 'left'));
            }}
          >
            <MenuItem value="Hr:Min:Sec" primaryText="Hr:Min:Sec" />
            <MenuItem value="Decimal Degrees" primaryText="Decimal Degrees" />
            <MenuItem value="Default" primaryText="Default" />
            <MenuItem value="No Label" primaryText="No Label" />
          </DropDownMenu>
          <p>Right: </p>
          <DropDownMenu
            value={this.props.dataGrid.labelFormats.right.format}
            onChange={(event, key, value) => {
              this.props.dispatch(actions.setGridLabelFormat(value, 'right'));
            }}
          >
            <MenuItem value="Hr:Min:Sec" primaryText="Hr:Min:Sec" />
            <MenuItem value="Decimal Degrees" primaryText="Decimal Degrees" />
            <MenuItem value="Default" primaryText="Default" />
            <MenuItem value="No Label" primaryText="No Label" />
          </DropDownMenu>
          <p>Top: </p>
          <DropDownMenu
            value={this.props.dataGrid.labelFormats.top.format}
            onChange={(event, key, value) => {
              this.props.dispatch(actions.setGridLabelFormat(value, 'top'));
            }}
          >
            <MenuItem value="Deg:Min:Sec" primaryText="Deg:Min:Sec" />
            <MenuItem value="Decimal Degrees" primaryText="Decimal Degrees" />
            <MenuItem value="Default" primaryText="Default" />
            <MenuItem value="No Label" primaryText="No Label" />
          </DropDownMenu>
          <p>Bottom: </p>
          <DropDownMenu
            value={this.props.dataGrid.labelFormats.bottom.format}
            onChange={(event, key, value) => {
              this.props.dispatch(actions.setGridLabelFormat(value, 'bottom'));
            }}
          >
            <MenuItem value="Deg:Min:Sec" primaryText="Deg:Min:Sec" />
            <MenuItem value="Decimal Degrees" primaryText="Decimal Degrees" />
            <MenuItem value="Default" primaryText="Default" />
            <MenuItem value="No Label" primaryText="No Label" />
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

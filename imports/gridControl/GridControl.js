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
  handleFontChange = (event, index, value) => {
    this.setState({ family: value });
  }
  render() {
    let content = null;
    const subSetting = this.props.subSetting;
    // console.log('INSIDE DISPLAY');
    const { dataGrid } = this.props;
    if (subSetting === 'canvas') {
      const coordinateSystems = [];
      const supportedCS = dataGrid.supportedCS;
      for (let i = 0; i < supportedCS.length; i += 1) {
        coordinateSystems.push(<MenuItem value={supportedCS[i]} primaryText={supportedCS[i]} key={i} />);
      }

      content =
      (<div>
        <Toggle
          label="Show Coordinate System"
          toggled={dataGrid.showCoordinateSystem}
          style={{ marginBottom: 16 }}
          onToggle={(event, newValue) => {
            this.props.dispatch(actions.setShowCoordinateSystem(newValue));
          }}
        />
        <Toggle
          label="Use Default Coordinate System"
          toggled={dataGrid.showDefaultCS}
          style={{ marginBottom: 16 }}
          onToggle={(event, newValue) => {
            this.props.dispatch(actions.setShowDefaultCoordinateSystem(newValue));
          }}
        />
        <SelectField
          floatingLabelText="Current Coordinate System"
          value={dataGrid.skyCS}
          disabled={dataGrid.showDefaultCS}
          onChange={(event, index, value) => {
            this.props.dispatch(actions.setCoordinateSystem(value));
          }}
        >
          {coordinateSystems}
        </SelectField>
       </div>);
    } else if (subSetting === 'grid') {
      content =
        (<div>
          <Toggle
            label="Show Grid Lines"
            toggled={dataGrid.showGridLines}
            style={{ marginBottom: 16 }}
            onToggle={(event, newValue) => {
              this.props.dispatch(actions.setShowGridLines(newValue));
            }}
          />
          <TextField
            floatingLabelText="spacing"
            onChange={(event, newValue) => {
              console.log('new val: ', newValue);
              this.props.dispatch(actions.setGridSpacing(newValue));
            }}
            value={dataGrid.spacing}
          />
          <Slider
            min={0}
            max={1}
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setGridSpacing(newValue));
            }}
            value={dataGrid.spacing}
            step={0.01}
          />
          <TextField
            floatingLabelText="thickness"
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setGridThickness(newValue));
            }}
            value={dataGrid.grid.width}
            // defaultValue={1}
          />
          <Slider
            min={1}
            max={10}
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setGridThickness(newValue));
            }}
            value={dataGrid.grid.width}
            step={1}
          />
          <TextField
            floatingLabelText="opacity"
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setGridTransparency(newValue));
            }}
            value={dataGrid.grid.alpha}
          />
          <Slider
            min={0}
            max={255}
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setGridTransparency(newValue));
            }}
            value={dataGrid.grid.alpha}
            step={1}
          />
        </div>);
    } else if (subSetting === 'axes') {
      const axes = [];
      const supportedAxes = dataGrid.supportedAxes;
      for (let i = 0; i < supportedAxes.length; i += 1) {
        axes.push(<MenuItem value={supportedAxes[i]} primaryText={supportedAxes[i]} key={i} />);
      }

      content = (
        <div>
          <Toggle
            label="Show Axes/Border"
            toggled={dataGrid.showAxis}
            style={{ marginBottom: 16 }}
            onToggle={(event, newValue) => {
              this.props.dispatch(actions.setShowAxis(newValue));
            }}
          />
          <Toggle
            label="Use Internal Axes"
            toggled={dataGrid.showInternalLabels}
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
            value={dataGrid.axes.width}
          />
          <Slider
            min={1}
            max={10}
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setAxesThickness(newValue));
            }}
            value={dataGrid.axes.width}
            step={1}
          />
          <TextField
            floatingLabelText="opacity"
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setAxesTransparency(newValue));
            }}
            value={dataGrid.axes.alpha}
          />
          <Slider
            min={0}
            max={255}
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setAxesTransparency(newValue));
            }}
            value={dataGrid.axes.alpha}
            step={1}
          />
          <SelectField
            floatingLabelText="X Axis"
            value={dataGrid.xAxis}
            onChange={(event, index, value) => {
              this.props.dispatch(actions.setAxisX(value));
            }}
          >
            {axes}
          </SelectField>
          <SelectField
            floatingLabelText="Y Axis"
            value={dataGrid.yAxis}
            onChange={(event, index, value) => {
              this.props.dispatch(actions.setAxisY(value));
            }}
          >
            {axes}
          </SelectField>
        </div>
      );
    } else if (subSetting === 'labels') {
      content = (
        <div>
          <p>Family: </p>
          <DropDownMenu
            value={dataGrid.font.family}
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
            value={dataGrid.font.size}
            onChange={(event, value) => {
              this.props.dispatch(actions.setFontSize(value));
            }}
            style={numericInputStyle}
          />
          <NumericInput
            min={0}
            max={dataGrid.decimalsMax}
            value={dataGrid.decimals}
            onChange={(event, value) => {
              this.props.dispatch(actions.setLabelDecimals(value));
            }}
            style={numericInputStyle}
          />
          {/* TODO: The function is unfinished.
          The hard code in label format menu should be modified to match
          the permuted image and spectral axis, etc. */}
          <p>Left: </p>
          <DropDownMenu
            value={dataGrid.labelFormats.left.format}
            onChange={(event, key, value) => {
              this.props.dispatch(actions.setGridLabelFormat(value, 'left'));
            }}
          >
            <MenuItem value="Deg:Min:Sec" primaryText="Hr:Min:Sec" />
            <MenuItem value="Decimal Degrees" primaryText="Decimal Degrees" />
            <MenuItem value="Default" primaryText="Default" />
            <MenuItem value="No Label" primaryText="No Label" />
          </DropDownMenu>
          <p>Right: </p>
          <DropDownMenu
            value={dataGrid.labelFormats.right.format}
            onChange={(event, key, value) => {
              this.props.dispatch(actions.setGridLabelFormat(value, 'right'));
            }}
          >
            <MenuItem value="Deg:Min:Sec" primaryText="Hr:Min:Sec" />
            <MenuItem value="Decimal Degrees" primaryText="Decimal Degrees" />
            <MenuItem value="Default" primaryText="Default" />
            <MenuItem value="No Label" primaryText="No Label" />
          </DropDownMenu>
          <p>Top: </p>
          <DropDownMenu
            value={dataGrid.labelFormats.top.format}
            onChange={(event, key, value) => {
              this.props.dispatch(actions.setGridLabelFormat(value, 'top'));
            }}
          >
            <MenuItem value="Hr:Min:Sec" primaryText="Deg:Min:Sec" />
            <MenuItem value="Decimal Degrees" primaryText="Decimal Degrees" />
            <MenuItem value="Default" primaryText="Default" />
            <MenuItem value="No Label" primaryText="No Label" />
          </DropDownMenu>
          <p>Bottom: </p>
          <DropDownMenu
            value={dataGrid.labelFormats.bottom.format}
            onChange={(event, key, value) => {
              this.props.dispatch(actions.setGridLabelFormat(value, 'bottom'));
            }}
          >
            <MenuItem value="Hr:Min:Sec" primaryText="Deg:Min:Sec" />
            <MenuItem value="Decimal Degrees" primaryText="Decimal Degrees" />
            <MenuItem value="Default" primaryText="Default" />
            <MenuItem value="No Label" primaryText="No Label" />
          </DropDownMenu>
        </div>
      );
    } else if (subSetting === 'ticks') {
      content =
        (<div>
          <Toggle
            label="Show Ticks"
            toggled={dataGrid.showTicks}
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
            value={dataGrid.tickLength}
            // defaultValue={}
          />
          <Slider
            min={0}
            max={50}
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setTickLength(newValue));
            }}
            value={dataGrid.tickLength}
            step={1}
          />
          <TextField
            floatingLabelText="thickness"
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setTickThickness(newValue));
            }}
            value={dataGrid.tick.width}
            // defaultValue={1}
          />
          <Slider
            min={1}
            max={10}
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setTickThickness(newValue));
            }}
            value={dataGrid.tick.width}
            step={1}
          />
          <TextField
            floatingLabelText="opacity"
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setTickTransparency(newValue));
            }}
            value={dataGrid.tick.alpha}
          />
          <Slider
            min={0}
            max={255}
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setTickTransparency(newValue));
            }}
            value={dataGrid.tick.alpha}
            step={1}
          />
        </div>);
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataGrid: state.GridDB.DataGrid,
  subSetting: state.ImageSettingsDB.subSetting,
//   animatorTypeList: state.AnimatorDB.animatorTypeList,
//   currentAnimatorType: state.AnimatorDB.currentAnimatorType,
});

export default connect(mapStateToProps)(GridControl);

import React, { Component } from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';
=======
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';
import SelectField from 'material-ui/SelectField';
>>>>>>> 53eee3262e018031a4c61fa2e86d52c57c0ebc13
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
<<<<<<< HEAD
      length: this.props.dataGrid.tickLength,
      // thickness is width
      thickness: 1,
      // opacity is alpha
      opacity: 255,
      axes: [],
      supportedCS: [],
      family: this.props.dataGrid.font.family,
      fontSize: this.props.dataGrid.font.size,
      precision: this.props.dataGrid.decimals,
      xValue: this.props.dataGrid.xAxis,
      yValue: this.props.dataGrid.yAxis,
      labelLeft: this.props.dataGrid.labelFormats.left.format,
      labelRight: this.props.dataGrid.labelFormats.right.format,
      labelTop: this.props.dataGrid.labelFormats.top.format,
      labelBottom: this.props.dataGrid.labelFormats.bottom.format,
      system: this.props.dataGrid.skyCS,
      spacing: this.props.dataGrid.spacing,
    };
    // this.props.dispatch(actions.setupAnimator());
  }
  componentDidMount = () => {
    if (this.props.dataGrid.supportedAxes) {
      const supportedAxes = this.props.dataGrid.supportedAxes;
      for (let i = 0; i < supportedAxes.length; i += 1) {
        this.setState(prevState => ({
          axes: prevState.axes.concat(
            <MenuItem value={supportedAxes[i]} primaryText={supportedAxes[i]} key={i} />),
        }));
      }
    }
    if (this.props.dataGrid.supportedCS) {
      const supportedCS = this.props.dataGrid.supportedCS;
      for (let i = 0; i < supportedCS.length; i += 1) {
        if (supportedCS[i] !== 'Unknown') {
          this.setState(prevState => ({
            supportedCS: prevState.supportedCS.concat(
              <MenuItem value={supportedCS[i]} primaryText={supportedCS[i]} key={i} />),
          }));
        }
      }
    }
  }
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
  handleCSChange = (event, index, value) => {
    this.setState({ system: value });
  }
  display = () => {
    let content = null;
    const option = this.props.option;
    if (option === 'ticks') {
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
=======
      family: this.props.dataGrid.font.family,
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
  handleFontChange = (event, index, value) => {
    this.setState({ family: value });
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
          toggled={this.props.useDefaultCoordinateSystem}
          style={{ marginBottom: 16 }}
          onToggle={(event, newValue) => {
            this.props.dispatch(actions.setDefaultCoordinateSystem(newValue));
          }}
        />
        <SelectField
          floatingLabelText="Current Coordinate System"
          value={this.props.dataGrid.skyCS}
          disabled={this.props.useDefaultCoordinateSystem}
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
>>>>>>> 53eee3262e018031a4c61fa2e86d52c57c0ebc13
            // defaultValue={1}
          />
          <Slider
            min={1}
            max={10}
<<<<<<< HEAD
            onChange={(event, newValue) => this.setState({ thickness: newValue })}
            value={this.state.thickness}
=======
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setAxesThickness(newValue));
            }}
            value={this.props.dataGrid.axes.width}
>>>>>>> 53eee3262e018031a4c61fa2e86d52c57c0ebc13
            step={1}
          />
          <TextField
            floatingLabelText="opacity"
<<<<<<< HEAD
            onChange={(event, newValue) => this.setState({ opacity: newValue })}
            value={this.state.opacity}
=======
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setAxesTransparency(newValue));
            }}
            value={this.props.dataGrid.axes.alpha}
>>>>>>> 53eee3262e018031a4c61fa2e86d52c57c0ebc13
            // defaultValue={1}
          />
          <Slider
            min={0}
            max={255}
<<<<<<< HEAD
            onChange={(event, newValue) => this.setState({ opacity: newValue })}
            value={this.state.opacity}
            step={1}
          />
        </div>);
    } else if (option === 'labels') {
=======
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
>>>>>>> 53eee3262e018031a4c61fa2e86d52c57c0ebc13
      content = (
        <div>
          <p>Family: </p>
          <DropDownMenu
<<<<<<< HEAD
            value={this.state.family}
            onChange={this.handleFontChange}
          >
=======
            value={this.props.dataGrid.font.family}
            onChange={(event, key, value) => {
              this.props.dispatch(actions.setFontFamily(value));
            }}
          >
            {/* TODO: the function is unfinished */}
>>>>>>> 53eee3262e018031a4c61fa2e86d52c57c0ebc13
            <MenuItem value="Helvetica" primaryText="Helvetica" />
            <MenuItem value="Times New Roman" primaryText="Times New Roman" />
            <MenuItem value="Courier New" primaryText="Courier New" />
          </DropDownMenu>
          <NumericInput
            min={0}
            max={20}
<<<<<<< HEAD
            value={this.state.fontSize}
=======
            value={this.props.dataGrid.font.size}
            onChange={(event, value) => {
              this.props.dispatch(actions.setFontSize(value));
            }}
>>>>>>> 53eee3262e018031a4c61fa2e86d52c57c0ebc13
            style={numericInputStyle}
          />
          <NumericInput
            min={0}
            max={this.props.dataGrid.decimalsMax}
<<<<<<< HEAD
            value={this.state.precision}
=======
            value={this.props.dataGrid.decimals}
            onChange={(event, value) => {
              this.props.dispatch(actions.setLabelDecimals(value));
            }}
>>>>>>> 53eee3262e018031a4c61fa2e86d52c57c0ebc13
            style={numericInputStyle}
          />
          <p>Left: </p>
          <DropDownMenu
<<<<<<< HEAD
            value={this.state.labelLeft}
            onChange={this.handleLabelLeft}
=======
            value={this.props.dataGrid.labelFormats.left.format}
            onChange={(event, key, value) => {
              this.props.dispatch(actions.setGridLabelFormat(value, 'left'));
            }}
>>>>>>> 53eee3262e018031a4c61fa2e86d52c57c0ebc13
          >
            <MenuItem value="Hr:Min:Sec" primaryText="Hr:Min:Sec" />
            <MenuItem value="Decimal Degrees" primaryText="Decimal Degrees" />
            <MenuItem value="Default" primaryText="Default" />
            <MenuItem value="No Label" primaryText="No Label" />
          </DropDownMenu>
          <p>Right: </p>
          <DropDownMenu
<<<<<<< HEAD
            value={this.state.labelRight}
            onChange={this.handleLabelRight}
=======
            value={this.props.dataGrid.labelFormats.right.format}
            onChange={(event, key, value) => {
              this.props.dispatch(actions.setGridLabelFormat(value, 'right'));
            }}
>>>>>>> 53eee3262e018031a4c61fa2e86d52c57c0ebc13
          >
            <MenuItem value="Hr:Min:Sec" primaryText="Hr:Min:Sec" />
            <MenuItem value="Decimal Degrees" primaryText="Decimal Degrees" />
            <MenuItem value="Default" primaryText="Default" />
            <MenuItem value="No Label" primaryText="No Label" />
          </DropDownMenu>
          <p>Top: </p>
          <DropDownMenu
<<<<<<< HEAD
            value={this.state.labelTop}
            onChange={this.handleLabelTop}
=======
            value={this.props.dataGrid.labelFormats.top.format}
            onChange={(event, key, value) => {
              this.props.dispatch(actions.setGridLabelFormat(value, 'top'));
            }}
>>>>>>> 53eee3262e018031a4c61fa2e86d52c57c0ebc13
          >
            <MenuItem value="Deg:Min:Sec" primaryText="Deg:Min:Sec" />
            <MenuItem value="Decimal Degrees" primaryText="Decimal Degrees" />
            <MenuItem value="Default" primaryText="Default" />
            <MenuItem value="No Label" primaryText="No Label" />
          </DropDownMenu>
          <p>Bottom: </p>
          <DropDownMenu
<<<<<<< HEAD
            value={this.state.labelBottom}
            onChange={this.handleLabelBottom}
=======
            value={this.props.dataGrid.labelFormats.bottom.format}
            onChange={(event, key, value) => {
              this.props.dispatch(actions.setGridLabelFormat(value, 'bottom'));
            }}
>>>>>>> 53eee3262e018031a4c61fa2e86d52c57c0ebc13
          >
            <MenuItem value="Deg:Min:Sec" primaryText="Deg:Min:Sec" />
            <MenuItem value="Decimal Degrees" primaryText="Decimal Degrees" />
            <MenuItem value="Default" primaryText="Default" />
            <MenuItem value="No Label" primaryText="No Label" />
          </DropDownMenu>
        </div>
      );
<<<<<<< HEAD
    } else if (option === 'axes') {
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
    } else if (option === 'canvas') {
      content = (
        <div>
          <Checkbox
            label="Coordinate System"
            style={{ width: 250 }}
            defaultChecked={this.props.dataGrid.showCoordinateSystem}
          />
          <Checkbox
            label="Cursor"
            style={{ width: 150 }}
            defaultChecked={this.props.dataGrid.showStatistics}
          />
          <p>System: </p>
          <DropDownMenu
            value={this.state.system}
            onChange={this.handleCSChange}
          >
            {this.state.supportedCS.map(item => item)}
          </DropDownMenu>

        </div>
      );
    } else if (option === 'grid') {
      content =
        (<div>
          <Checkbox
            label="Grid Lines"
            style={{ width: 150 }}
            defaultChecked={this.props.dataGrid.showGridLines}
          />
          <TextField
            floatingLabelText="thickness"
            onChange={(event, newValue) => this.setState({ thickness: newValue })}
            value={this.state.thickness}
            // defaultValue={}
=======
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
>>>>>>> 53eee3262e018031a4c61fa2e86d52c57c0ebc13
          />
          <Slider
            min={1}
            max={10}
<<<<<<< HEAD
            onChange={(event, newValue) => this.setState({ thickness: newValue })}
            value={this.state.thickness}
=======
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setTickThickness(newValue));
            }}
            value={this.props.dataGrid.tick.width}
>>>>>>> 53eee3262e018031a4c61fa2e86d52c57c0ebc13
            step={1}
          />
          <TextField
            floatingLabelText="opacity"
<<<<<<< HEAD
            onChange={(event, newValue) => this.setState({ opacity: newValue })}
            value={this.state.opacity}
            // defaultValue={1}
=======
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setTickTransparency(newValue));
            }}
            value={this.props.dataGrid.tick.alpha}
>>>>>>> 53eee3262e018031a4c61fa2e86d52c57c0ebc13
          />
          <Slider
            min={0}
            max={255}
<<<<<<< HEAD
            onChange={(event, newValue) => this.setState({ opacity: newValue })}
            value={this.state.opacity}
            step={1}
          />
          <TextField
            floatingLabelText="spacing"
            onChange={(event, newValue) => this.setState({ spacing: newValue })}
            value={this.state.spacing * 1000}
            // defaultValue={1}
          />
          <Slider
            min={0}
            max={1000}
            onChange={(event, newValue) => this.setState({ spacing: newValue })}
            value={this.state.spacing}
=======
            onChange={(event, newValue) => {
              this.props.dispatch(actions.setTickTransparency(newValue));
            }}
            value={this.props.dataGrid.tick.alpha}
>>>>>>> 53eee3262e018031a4c61fa2e86d52c57c0ebc13
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
<<<<<<< HEAD
=======
  useDefaultCoordinateSystem: state.GridDB.useDefaultCoordinateSystem,
>>>>>>> 53eee3262e018031a4c61fa2e86d52c57c0ebc13
//   animatorTypeList: state.AnimatorDB.animatorTypeList,
//   currentAnimatorType: state.AnimatorDB.currentAnimatorType,
});

export default connect(mapStateToProps)(GridControl);

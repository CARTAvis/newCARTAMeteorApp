import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Add from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';
import Mask from 'material-ui/svg-icons/content/select-all';
import LastPage from 'material-ui/svg-icons/navigation/last-page';
import Refresh from 'material-ui/svg-icons/navigation/refresh';
import Stop from 'material-ui/svg-icons/av/stop';
import actions from './actions';
import { connect } from 'react-redux';
import { Layer, Stage, Rect, Group, Text } from 'react-konva';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const style = {
  button : {
    marginRight: 10,
  },
  twoColumn : {
    width: '45%',
  },
  spacer : {
    display:'inline-block',
    width:'10%'
  },
  label : {
    font:'caption',
    fontFamily:'Roboto',
    color:'#BDBDBD',
    marginBottom:'8dp'
  },
  labelRight : {
    align:'right'
  }
};
const twoColumnStyle = {
  width: '45%',
};

class InteractiveClean extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedProcess: 2,
          advancedClean:false,
          parameters: {niter:'',
                       threshold:'',
                       cycleNiter:'',
                       interactiveNiter:'',
                       cycleThreshold:'',
                       interactiveThreshold:'',
                       cycleFactor:'',
                       loopGain:''},
        };
        this.props.dispatch(actions.setupInteractiveClean());
        //this.props.dispatch(actions.updateInteractiveClean());
    }

    componentWillReceiveProps = (nextProps) => {
      if(nextProps.parameters){
        this.setState({ parameters:nextProps.parameters });
      }
    }



    handleProcessSelect = (event, index, selectedProcess) => this.setState({selectedProcess});

    handleChangeParameters = (event) => {
      console.log("changed: ",event.target.name);
      let parameters = {...this.state.parameters};
      switch(event.target.name){
        case "niterField":
          parameters.niter = parseInt(event.target.value);
          this.setState({parameters});
          break;
        case "thresholdField":
          parameters.threshold = event.target.value;
          this.setState({parameters});
          break;
        case "cycleNiterField":
          parameters.cycleNiter = parseInt(event.target.value);
          this.setState({parameters});
          break;
        case "interactiveNiterField":
          parameters.interactiveNiter = parseInt(event.target.value);
          this.setState({parameters});
          break;
        case "cycleThresholdField":
          parameters.cycleThreshold = parseFloat(event.target.value);
          this.setState({parameters});
          break;
        case "interactiveThresholdField":
          parameters.interactiveThreshold = parseFloat(event.target.value);
          this.setState({parameters});
          break;
        case "cycleFactorField":
          parameters.cycleFactor = parseInt(event.target.value);
          this.setState({parameters});
          break;
        case "loopGainField":
          parameters.loopGain = parseInt(event.target.value);
          this.setState({parameters});
          break;
        default:
          console.log("Unrecognized Field Changed");
          break;
        }
    };

    toggleAdvanced = (event, advancedClean) => this.setState({advancedClean});

    render(){
      const { parameters } = this.props;
      console.log("parameters: render ", this.state.parameters);
      const advancedForm = (
        <div>
        <Toggle
          label="Advanced"
          onToggle = {this.toggleAdvanced}
          style={{ width:'45%', marginTop:'20px'}}
          defaultToggled = {false}
          toggled = {this.state.advancedClean}
        />
        <TextField
          floatingLabelText="Cycle NIter"
          name="cycleNiterField"
          value = {this.state.parameters.cycleNiter}
          onChange={this.handleChangeParameters}
          disabled = {!this.state.advancedClean}
          style = {style.twoColumn}
        />
        <span style={style.spacer}/>
        <TextField
          floatingLabelText="Interactive NIter"
          name="interactiveNiterField"
          value = {this.state.parameters.interactiveNiter}
          onChange={this.handleChangeParameters}
          disabled = {!this.state.advancedClean}
          style = {style.twoColumn}
        />
        <TextField
          floatingLabelText="Cycle Threshold"
          name="cycleThresholdField"
          value = {this.state.parameters.cycleThreshold}
          onChange={this.handleChangeParameters}
          disabled = {!this.state.advancedClean}
          style = {style.twoColumn}
        />
        <span style={style.spacer}/>
        <TextField
          floatingLabelText="Interactive Threshold"
          name="interactiveThresholdField"
          value = {this.state.parameters.interactiveThreshold}
          onChange={this.handleChangeParameters}
          disabled = {!this.state.advancedClean}
          style = {style.twoColumn}
        />
        <TextField
          floatingLabelText="Cycle Factor"
          name="cycleFactorField"
          value = {this.state.parameters.cycleFactor}
          onChange={this.handleChangeParameters}
          disabled = {!this.state.advancedClean}
          style = {style.twoColumn}
        />
        <span style={style.spacer}/>
        <TextField
          floatingLabelText="Loop Gain"
          name="loopGainField"
          value={this.state.parameters.loopGain}
          onChange={this.handleChangeParameters}
          disabled = {!this.state.advancedClean}
          style = {style.twoColumn}
        />
        </div>
      );

      const maskButtons = (
        <div style={{float:'left', marginTop: '0px', textAlign:'left'}}>
        <p style={style.label}>Mask Controls</p>
        <FloatingActionButton
        mini={true}
        onClick={() => this.pressMaskButton('showMask')}
        style={style.button}
        >
        <Mask />
        </FloatingActionButton>
        <FloatingActionButton
         mini={true}
         onClick={() => this.pressMaskButton('addMask')}
         style={style.button}
         >
         <Add />
         </FloatingActionButton>
        <FloatingActionButton
         mini={true}
         onClick={() => this.pressMaskButton('subtractMask')}
         style={style.button}
         >
         <Remove />
         </FloatingActionButton>
        </div>
      );

      const controlButtons = (
        <div style={{float:'right', marginTop: '0px', textAlign:'right'}}>
        <p style={style.label}>Clean Controls</p>
        <FloatingActionButton
        backgroundColor="#D50000"
        mini={true}
        onClick={() => this.pressCleanButton('stopClean')}
        style={style.button}
        >
        <Stop />
        </FloatingActionButton>
        <FloatingActionButton
         backgroundColor="#5C6BC0"
         mini={true}
         onClick={() => this.pressCleanButton('runToEnd')}
         style={style.button}
         >
         <LastPage />
         </FloatingActionButton>
        <FloatingActionButton
         backgroundColor="#00C853"
         mini={true}
         onClick={() => this.pressCleanButton('runReturn')}
         >
         <Refresh />
         </FloatingActionButton>
        </div>
      );

      const cleanForm = (
        <form>
          <div style={{ display:'block', padding:'0 5%'}}>
            <div style={{ display:'block'}}>
              <SelectField
                floatingLabelText="Clean Process ID"
                value={this.state.selectedProcess}
                style={{width:'100%'}}
                onChange={this.handleProcessSelect}
                >
                <MenuItem value={1} primaryText="Process 1" />
                <MenuItem value={2} primaryText="Process 2" />
                <MenuItem value={3} primaryText="Process 3" />
              </SelectField>
            </div>
          <div>
          <TextField
            floatingLabelText="NIter"
            hintText="Iterations"
            name="niterField"
            type="number"
            value = {this.state.parameters.niter}
            style = {style.twoColumn}
            onChange={this.handleChangeParameters}
            autoFocus
            />
          <span style={style.spacer}/>
          <TextField
            floatingLabelText="Threshold"
            name="thresholdField"
            value = {this.state.parameters.threshold}
            onChange={this.handleChangeParameters}
            style = {style.twoColumn}
            />
          </div>

      {advancedForm}
      {maskButtons}
      {controlButtons}

      </div>
        </form>
      );

      return(
        cleanForm
      );
    }

    pressMaskButton = (buttonTitle) =>{
      this.props.dispatch(actions.sendMaskCommand(buttonTitle));
    }

    pressCleanButton = (buttonTitle) =>{
      this.props.dispatch(actions.sendCleanCommand(buttonTitle));
    }
}



const mapStateToProps = state => ({
  parameters: state.InteractiveCleanDB.parameters,
  niter: state.InteractiveCleanDB.niter,
});

export default connect(mapStateToProps)(InteractiveClean);

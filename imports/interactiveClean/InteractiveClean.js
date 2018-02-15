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
          value: 2,
          niterText: "",
          advancedClean:false,
        };
        this.props.dispatch(actions.setupInteractiveClean());
    }




    handleChange = (event, index, value) => this.setState({value});
    handleChangeText = (event) => {
        this.setState({
          niterText: event.target.value,
        });
      };
      handleToggle = (event, advancedClean) => this.setState({advancedClean});
    // handleToggle = (event) => {
    //   console.log("toggling!");
    //     this.setState({
    //       advancedClean: !event.target.toggled,
    //     });
    //   };


    render(){

      const { buttonText } = this.props;

      const advancedForm = (
        <div>
        <Toggle
          label="Advanced"
          onToggle = {this.handleToggle}
          style={{ width:'45%', marginTop:'20px'}}
          defaultToggled = {false}
          toggled = {this.state.advancedClean}
        />
        <TextField
          floatingLabelText="Cycle NIter"
          //hintText="Cycle Iterations"
          defaultValue = "100"
          disabled = {!this.state.advancedClean}
          //value = {this.state.niterText}
          style = {style.twoColumn}
        />
        <span style={style.spacer}/>
        <TextField
          floatingLabelText="Interactive NIter"
          disabled = {!this.state.advancedClean}
          style = {style.twoColumn}
        />
        <TextField
          floatingLabelText="Cycle Threshold"
          //hintText="Cycle Iterations"
          disabled = {!this.state.advancedClean}
          //value = {this.state.niterText}
          style = {style.twoColumn}
        />
        <span style={style.spacer}/>
        <TextField
          floatingLabelText="Interactive Threshold"
          disabled = {!this.state.advancedClean}
          style = {style.twoColumn}
        />
        <TextField
          floatingLabelText="Cycle Factor"
          //hintText="Cycle Iterations"
          disabled = {!this.state.advancedClean}
          //value = {this.state.niterText}
          style = {style.twoColumn}
        />
        <span style={style.spacer}/>
        <TextField
          floatingLabelText="Loop Gain"
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
        value={this.state.value}
        style={{width:'100%'}}
        onChange={this.handleChange}
        //fullWidth='true'
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
        value = {this.state.niterText}
        style = {style.twoColumn}
        onChange={this.handleChangeText}
        autoFocus
      />
      <span style={style.spacer}/>
      <TextField
        floatingLabelText="Threshold"
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
      //console.log('button pressed');
    }

    pressCleanButton = (buttonTitle) =>{
      //this.props.dispatch(actions.updateInteractiveClean());
      this.props.dispatch(actions.sendCleanCommand(buttonTitle));
      //console.log('button pressed:', buttonTitle);
    }
}



const mapStateToProps = state => ({
  buttonText: state.InteractiveCleanDB.buttonText,
});

export default connect(mapStateToProps)(InteractiveClean);

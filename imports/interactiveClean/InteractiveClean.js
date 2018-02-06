import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import actions from './actions';
import { connect } from 'react-redux';
import { Layer, Stage, Rect, Group, Text } from 'react-konva';

class InteractiveClean extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(actions.setupInteractiveClean());
    }

    render(){
      const { buttonText } = this.props;
        return(

            <div><RaisedButton onTouchTap={this.buttonPressed} label="Clean!" secondary /></div>
        );
    }

    buttonPressed = () =>{
      console.log('button pressed');
    }

}

const mapStateToProps = state => ({
  buttonText: state.InteractiveCleanDB.buttonText,
});

export default connect(mapStateToProps)(InteractiveClean);

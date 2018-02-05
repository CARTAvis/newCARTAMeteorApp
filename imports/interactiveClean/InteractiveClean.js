import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import actions from './actions';
import { connect } from 'react-redux';

class InteractiveClean extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(actions.setupInteractiveClean());
    }

    render(){
        return(
            <div><RaisedButton style={buttonStyle} onTouchTap={this.buttonPressed} label="Read" secondary /></div>
        )
    }

    buttonPressed = () =>{
      console.log('button pressed');
    }

}

export default connect(mapStateToProps)(InteractiveClean);

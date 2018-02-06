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
          <Text
            x={532}
            y={0}
            width={100}
            text={`text`}
          />
          //            <div><RaisedButton style={buttonStyle} onTouchTap={this.buttonPressed} label="Read" secondary /></div>
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

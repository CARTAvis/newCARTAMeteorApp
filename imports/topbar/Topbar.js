import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import More from 'material-ui/svg-icons/navigation/more-horiz';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
// import Dialog from 'material-ui/Dialog';
import actions from './actions';
import SessionUI from '../app/SessionUI';

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      localDisabled: true,
      remoteDisabled: false,
      username: '',
    };
  }
  componentDidMount = () => {
    Meteor.autorun(() => {
      if (Meteor.user()) {
        let name = '';
        if (Meteor.user().profile) name = Meteor.user().profile.name;
        else name = Meteor.user().username;
        this.setState({ username: name });
      }
    });
    // setTimeout(() => {
    //   if (Meteor.user()) this.setState({ username: Meteor.user().username });
    // }, 200);
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  handleConfig = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };
  handleLocal = () => {
    // if local is set and remote isn't, don't do anything when local is clicked
    if (this.state.localDisabled && !this.state.remoteDisabled) {
      return;
    }
    // otherwise, if not set, set it and unset remote
    this.setState({
      localDisabled: true,
      remoteDisabled: false,
    });
  }
  handleRemote = () => {
    if (this.state.remoteDisabled && !this.state.localDisabled) {
      return;
    }
    // otherwise, if not set, set it and unset local
    this.setState({
      localDisabled: false,
      remoteDisabled: true,
    });
  }
  drawRect = () => {
    const button = document.getElementById('rect');
    if (!button.style.background || button.style.background === 'none') {
      button.style.background = '#D3D3D3';
    } else {
      button.style.background = 'none';
    }
    this.props.dispatch(actions.initRegion());
  }
  render() {
    // console.log('METEOR: ', Meteor.users.find({ _id: Meteor.userId() }).fetch());
    return (
      <div>
        <Toolbar style={this.props.style}>
          <ToolbarGroup>
            <div className="layout-row-end-center ">
              <p style={{ borderRadius: '12px', border: '2px solid red', padding: '2px' }}>{this.state.username ? `Hi, ${this.state.username}` : ''}</p>
              <SessionUI />
            </div>
            <div>
              <div>
                Region
              </div>
              <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <button id="rect" onClick={this.drawRect} className="region">
                    <img className="iconImg" src="/images/rectangle.png" alt="" />
                  </button>
                  <button className="region">
                    <img className="iconImg" src="/images/point.png" alt="" />
                  </button>
                  <button className="region">
                    <img className="iconImg" src="/images/ellipse.png" alt="" />
                  </button>
                  <button className="region">
                    <img className="iconImg" src="/images/polygon.png" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </ToolbarGroup>
          {/* <ToolbarGroup style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <p>Region</p>
            </div>
            <div>
              <p>test</p>
            </div>
          </ToolbarGroup> */}
          <ToolbarGroup lastChild>
            <RaisedButton label="Local" disabledBackgroundColor="#E0E0E0" disabledLabelColor="#9E9E9E" onClick={this.handleLocal} disabled={this.state.localDisabled} />
            <ToolbarSeparator style={{ margin: 0 }} />
            <RaisedButton label="Remote" disabledBackgroundColor="#E0E0E0" disabledLabelColor="#9E9E9E" onClick={this.handleRemote} disabled={this.state.remoteDisabled} />
            <IconButton onClick={this.handleConfig}>
              <More />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleClose}
        >
          <div style={{ padding: '10px', paddingTop: 0 }}>
            <TextField
              floatingLabelText="IP/Domain"
            /><br />
            <FlatButton
              label="Apply"
              primary
              style={{ left: '65%' }}
              onClick={this.handleClose}
            />
          </div>
        </Popover>
      </div>
    );
  }
}
// const mapStateToProps = state => ({
//
// });
export default connect()(Topbar);

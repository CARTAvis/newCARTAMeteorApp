import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { connect } from 'react-redux';
/* material-ui beta */
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';


import AppBar from 'material-ui-next/AppBar';
import Toolbar from 'material-ui-next/Toolbar';

import actions from './actions';
import SessionUI from '../app/SessionUI';
import FileUI from '../app/FileUI';

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      localDisabled: true,
      remoteDisabled: false,
      openFiles: false,
      openBrowser: false,
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
  handleOpenFiles = () => {
    this.setState({
      openFiles: !this.state.openFiles,
      openBrowser: !this.state.openBrowser,
    });
  }

  drawRect = () => {
    if (!this.rect.style.background || this.rect.style.background === 'none') {
      this.rect.style.background = '#D3D3D3';
    } else {
      this.rect.style.background = 'none';
    }
    this.props.dispatch(actions.initRegion());
  }
  render() {
    // console.log('METEOR: ', Meteor.users.find({ _id: Meteor.userId() }).fetch());
    return (
      <div>
        <AppBar position="sticky" color="default">
          <Toolbar>
            <div className="layout-row-end-center ">
              <p style={{ borderRadius: '12px', border: '2px solid red', padding: '2px' }}>{this.state.username ? `Hi, ${this.state.username}` : ''}</p>
              <SessionUI handleLogout={this.props.handleLogout} />
            </div>
            <div>
              <div>
                  Region
              </div>
              <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <button ref={(node) => { if (node) { this.rect = node; } }} onClick={this.drawRect} className="region">
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
            <div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <FileUI />
              </div>
            </div>
          </Toolbar>
        </AppBar>
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
export default connect()(Topbar);

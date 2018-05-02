import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
/* material-ui beta */
import PeopleIcon from 'material-ui-icons/People';
import Copy from 'material-ui-icons/ContentCopy';
import IconButton from 'material-ui-next/IconButton';
import Popover from 'material-ui-next/Popover';
import TextField from 'material-ui-next/TextField';
import Button from 'material-ui-next/Button';
import Tooltip from 'material-ui-next/Tooltip';
import { MuiThemeProvider, createMuiTheme } from 'material-ui-next/styles';
import Run from 'material-ui/svg-icons/maps/directions-run';
import actions from './actions';

const style = {
  margin: 12,
  marginLeft: '50%',
};

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      // Name of the styleSheet
      tooltipPlacementRight: {
        background: 'transparent',
        width: '80px',
        fontSize: '15px',
        fontStyle: 'italic',
      },
      tooltipPlacementBottom: {
        background: 'transparent',
        width: '100px',
        fontSize: '15px',
        fontStyle: 'italic',
      },
    },
  },
});

class SessionUI extends Component {
  constructor(props) {
    super(props);
    this.state = { watching: false, sessionText: '', open: false };
  }

  handleChange = (event) => {
    // console.log('event:', event.target.value);
    this.setState({
      sessionText: event.target.value,
    });
  }
  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleLogout = () => {
    this.props.handleLogout();
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  switchWatchMode = () => {
    if (!this.state.watching) {
      if (this.state.sessionText) {
        this.setState({ watching: true });
        // save to SeesionManger:
        this.props.dispatch(actions.turnOnWatching(this.state.sessionText));
      }
    } else {
      this.setState({ watching: false });
      this.props.dispatch(actions.turnOffWatching());
    }

    // TODO: save to redux
  }
  render() {
    const { sessionID } = this.props;
    const buttonLabel = !this.state.watching ? 'Get Screen' : 'StopWatch';
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Tooltip title="Share session">
            <IconButton
              onClick={this.handleTouchTap}
            >
              <PeopleIcon />
            </IconButton>
          </Tooltip>
        </MuiThemeProvider>
        {this.state.watching ? 'watching' : false}
        <Popover
          open={this.state.open}
          onClose={this.handleRequestClose}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          style={{ width: '400px', height: '200px' }}
        >
          <TextField
            value={this.state.sessionText}
            label="Input shared screen's session ID"
            placeholder="shared screen ID"
            onChange={this.handleChange}
            style={{ margin: 10, width: '300px' }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                this.switchWatchMode();
              }
            }}
            margin="normal"
          />
          <Button
            variant="raised"
            size="medium"
            onClick={this.switchWatchMode}
            style={style}
          >
            {buttonLabel}
          </Button>
          <p style={{ textAlign: 'center' }}>
            My Session ID: <br />
            {sessionID}
            <CopyToClipboard
              text={sessionID}
            >
              <IconButton>
                <Copy />
              </IconButton>
            </CopyToClipboard>
          </p>
        </Popover>
        <MuiThemeProvider theme={theme}>
          <Tooltip title="Logout">
            <IconButton
              style={{
               }}
              onClick={this.handleLogout}
            >
              <Run />
            </IconButton>
          </Tooltip>
        </MuiThemeProvider>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  sessionID: state.sessionID,
});

export default connect(mapStateToProps)(SessionUI);

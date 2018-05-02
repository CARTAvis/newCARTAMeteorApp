import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui-next/IconButton';
import Tooltip from 'material-ui-next/Tooltip';
import { MuiThemeProvider, createMuiTheme } from 'material-ui-next/styles';

import Folder from 'material-ui/svg-icons/file/folder';
import Delete from 'material-ui/svg-icons/action/delete';
import filebrowserActions from '../fileBrowser/actions';
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
class FileUI extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setFileBrowser = () => {
    this.props.dispatch(filebrowserActions.setFileBrowser());
  }
  closeImage = () => {
    this.props.dispatch(filebrowserActions.closeFile());
  }

  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Tooltip title="Open files">
            <IconButton
              onClick={this.setFileBrowser}
            >
              <Folder />
            </IconButton>
          </Tooltip>
        </MuiThemeProvider>
        <MuiThemeProvider theme={theme}>
          <Tooltip title="Close current image">
            <IconButton
              onClick={this.closeImage}
              style={{
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect()(FileUI);

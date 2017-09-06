import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';

import { List, ListItem, makeSelectable } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentSend from 'material-ui/svg-icons/content/send';

// import folder from 'material-ui/svg-icons/file/folder';
// import attachment from 'material-ui/svg-icons/file/attachment';

import { connect } from 'react-redux';
import actions from './actions';

const browserStyle = {
  width: 800,
  margin: 20,
  // textAlign: 'center',
  // display: 'inline-block',
};

const buttonStyle = {
  margin: 12,
};


const SelectableList = makeSelectable(List);

class FileBrowser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: -1,
    };

    this.props.dispatch(actions.prepareFileBrowser());
  }

  closeBrowser = () => {
    console.log('close file browser');

    this.props.dispatch(actions.closeFileBrowser());
  }
  openBrowser = () => {
    console.log('open file browser');

    if (!this.props.browserOpened) {
      this.props.dispatch(actions.queryServerFileList());
    }
  }
  selectImage = (e, index) => {
    this.setState({ selectedIndex: index });
    console.log('SELECTED INDEX: ', index);
    this.props.dispatch(actions.selectFile(index));
  }

  readImage = () => {
    if (this.state.selectedIndex >= 0) {
      const file = this.props.files[this.state.selectedIndex];
      console.log('choolse file to read, index:', this.state.selectedIndex, ';name:', file.name);

      this.props.dispatch(actions.selectFileToOpen(`${this.props.rootDir}/${file.name}`));

      this.props.dispatch(actions.closeFileBrowser());
    }
  }

  render() {
    const { browserOpened, files, selectedFile } = this.props;
    const fileItems = files.map((file, index) => {
      if (file.type === 'fits') {
        return (
          // key is needed for ui array operation react, value is for selectableList of material-ui
          <ListItem style={{ fontSize: '14px', height: 40 }} value={index} key={file.name} primaryText={file.name} leftAvatar={<Avatar size={32} src="/images/fits.png" />} />
        );
      }
      return (
        <ListItem style={{ fontSize: '14px', height: 40 }} value={index} key={file.name} primaryText={file.name} leftAvatar={<Avatar size={32} src="/images/casa.png" />} />
      );
    });
    if (this.props.openBrowser) {
      this.openBrowser();
      console.log('OPENBROWSER TRUE');
    }
    return (
      // <Paper style={browserStyle} zDepth={1} >
      <div>
        {/* <p>File Browser, open file browser, then choose a file to read</p> */}
        {/* <RaisedButton style={buttonStyle} onTouchTap={this.openBrowser} label="Open Server's File Browser" primary />
        <RaisedButton style={buttonStyle} onTouchTap={this.closeBrowser} label="Close File Browser" secondary /> */}
        { browserOpened && fileItems && fileItems.length > 0 &&
          <div>
            <SelectableList style={{ maxHeight: 300, overflow: 'auto' }} onChange={this.selectImage} value={selectedFile}>
              {fileItems}
            </SelectableList>
            <RaisedButton style={buttonStyle} onTouchTap={this.readImage} label="Read" secondary />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  files: state.fileBrowserUI.files,
  rootDir: state.fileBrowserUI.rootDir,
  browserOpened: state.fileBrowserUI.fileBrowserOpened,
  selectedFile: state.fileBrowserUI.selectedFile,
});

// TODO use the below way to use simplified methods 
// export function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     prepareFileBrowser: actions.prepareFileBrowser,
// }, dispatch);
// }

export default connect(mapStateToProps)(FileBrowser);

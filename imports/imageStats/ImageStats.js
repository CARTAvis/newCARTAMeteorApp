import React, { Component } from 'react';
// import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import actions from './actions';

const basicOptions = ['Shape', 'RA Range', 'Dec Range', 'Frequency Range', 'Velocity Range', 'Restoring Beam'];

class ImageStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount = () => {
    const { imageStats, selectedIndex, imagePrefArray } = this.props;
    if (imageStats) {
      this.showStats(imageStats, selectedIndex, imagePrefArray);
    }
  }
  showStats = (stats, index, imagePrefArray) => {
    if (this.imgStats) {
      console.log('SHOW IMAGE STATS');
      const info = stats[index];
      this.imgStats.innerHTML = '';
      if (this.props.fileBrowserOpened) {
        for (const key in info) {
          if (info.hasOwnProperty(key) && (basicOptions.indexOf(key) >= 0 ? 1 : 0 )) {
            for (let i = 0; i < imagePrefArray.length; i += 1) {
              if (imagePrefArray[i].label === key && imagePrefArray[i].visible) {
                this.imgStats.appendChild(document.createTextNode(`${key}: ${info[key]}`));
                this.imgStats.appendChild(document.createElement('br'));
              }
            }
          }
        }
      } else {
        for (const key in info) {
          if (key !== 'Name' && info.hasOwnProperty(key)) {
            for (let i = 0; i < imagePrefArray.length; i += 1) {
              if (imagePrefArray[i].label === key && imagePrefArray[i].visible) {
                this.imgStats.appendChild(document.createTextNode(`${key}: ${info[key]}`));
                this.imgStats.appendChild(document.createElement('br'));
              }
            }
          }
        }
      }
    }
  }
  render() {
    const { imageStats, selectedIndex, imagePrefArray } = this.props;
    if (imageStats) {
      this.showStats(imageStats, selectedIndex, imagePrefArray);
    }
    return (
      <div>
        <p ref={(node) => { if (node) { this.imgStats = node; } }} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  imageStats: state.ImageStatsDB.imageStats,
  imagePrefArray: state.StatsSettingsDB.image,
  selectedIndex: state.ImageStatsDB.selectedIndex,
  fileBrowserOpened: state.FileBrowserDB.fileBrowserOpened,
});
export default connect(mapStateToProps)(ImageStats);

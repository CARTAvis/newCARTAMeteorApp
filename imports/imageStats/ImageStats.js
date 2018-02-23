import React, { Component } from 'react';
// import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import actions from './actions';

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
      // const statsArray = stats[index];
      const info = stats[index];
      this.imgStats.innerHTML = '';
      // const info = statsArray[0];
      // loop through json
      for (const key in info) {
        if (key !== 'Name' && info.hasOwnProperty(key)) {
          for (let i = 0; i < imagePrefArray.length; i += 1) {
            if (imagePrefArray[i].label === key && imagePrefArray[i].visible) {
            // console.log(info[key]);
              this.imgStats.appendChild(document.createTextNode(`${key}: ${info[key]}`));
              this.imgStats.appendChild(document.createElement('br'));
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
});
export default connect(mapStateToProps)(ImageStats);

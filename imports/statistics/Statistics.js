import React, { Component } from 'react';
// import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import actions from './actions';

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.props.dispatch(actions.setupStats());
  }
  // called when mounting statistics again after closing it
  componentDidMount = () => {
    if (this.props.stats && this.props.selectedIndex >= 0 && this.props.imagePrefArray) {
      this.showStats(this.props.stats, this.props.selectedIndex, this.props.imagePrefArray);
    }
  }
  componentWillReceiveProps = (nextProps) => {
    // if ((!this.props.stats && nextProps.stats) &&
    //     (!this.props.selectedIndex && nextProps.selectedIndex >= 0) &&
    //     nextProps.imagePrefArray) {
    //   this.showStats(nextProps.stats, nextProps.selectedIndex, nextProps.imagePrefArray);
    // } else if ((this.props.stats && this.props.stats !== nextProps.stats) ||
    //       (this.props.selectedIndex && this.props.selectedIndex !== nextProps.selectedIndex) ||
    //       (this.props.imagePrefArray && nextProps.imagePrefArray !== this.props.imagePrefArray)) {
    //   this.showStats(nextProps.stats, nextProps.selectedIndex, nextProps.imagePrefArray);
    // }
    if (nextProps.stats && (nextProps.selectedIndex >= 0) && nextProps.imagePrefArray) {
      this.showStats(nextProps.stats, nextProps.selectedIndex, nextProps.imagePrefArray);
    }
    if (nextProps.regionArray) {
      if (nextProps.regionArray.length > 0) {
        this.showRegionStats(nextProps.stats, nextProps.selectedIndex, nextProps.regionPrefArray);
      }
    }
  }
  showRegionStats = (stats, index, regionPrefArray) => {
    // console.log('region pref: ', regionPrefArray);
    const statsArray = stats[index];
    const p = document.getElementById('p');
    // get the newest region stats info
    const info = statsArray[statsArray.length - 1];
    for (const key in info) {
      for (let i = 0; i < regionPrefArray.length; i += 1) {
        if (regionPrefArray[i].label === key && regionPrefArray[i].visible) {
          p.appendChild(document.createTextNode(`${key}: ${info[key]}`));
          p.appendChild(document.createElement('br'));
        }
      }
    }
  }
  showStats = (stats, index, imagePrefArray) => {
    const statsArray = stats[index];
    const p = document.getElementById('p');
    p.innerHTML = '';
    const info = statsArray[0];
    // loop through json
    for (const key in info) {
      if (key !== 'Name' && info.hasOwnProperty(key)) {
        for (let i = 0; i < imagePrefArray.length; i += 1) {
          if (imagePrefArray[i].label === key && imagePrefArray[i].visible) {
            // console.log(info[key]);
            p.appendChild(document.createTextNode(`${key}: ${info[key]}`));
            p.appendChild(document.createElement('br'));
          }
        }
      }
    }
  }
  render() {
    return (
      <div>
        <p id="p" />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  stats: state.StatsDB.stats,
  selectedIndex: state.StatsDB.selectedIndex,
  imagePrefArray: state.StatsSettingsDB.image,
  regionPrefArray: state.StatsSettingsDB.region,
  regionArray: state.RegionDB.regionArray,
});

export default connect(mapStateToProps)(Statistics);

import React, { Component } from 'react';
// import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import actions from './actions';

class RegionStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillReceiveProps = (nextProps) => {
    console.log('IMAGE REGION PROPS: ', nextProps);
  }
  showRegionStats = (stats, index, regionPrefArray) => {
    console.log('SHOW REGION STATS');
    if (this.p) {
      // const statsArray = stats[index];
      const info = stats[index];
      this.p.innerHTML = '';

      // const info = statsArray[statsArray.length - 1];
      for (const key in info) {
        for (let i = 0; i < regionPrefArray.length; i += 1) {
          if (regionPrefArray[i].label === key && regionPrefArray[i].visible) {
            this.p.appendChild(document.createTextNode(`${key}: ${info[key]}`));
            this.p.appendChild(document.createElement('br'));
          }
        }
      }
    }
  }
  render() {
    const { regionStats, selectedIndex, regionPrefArray } = this.props;
    if (regionStats) this.showRegionStats(regionStats, selectedIndex, regionPrefArray);
    return (
      <div>
        <p ref={(node) => { if (node) { this.p = node; } }} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  selectedIndex: state.ImageStatsDB.selectedIndex,
  regionPrefArray: state.StatsSettingsDB.region,
  regionStats: state.RegionStatsDB.regionStats,
});
export default connect(mapStateToProps)(RegionStats);

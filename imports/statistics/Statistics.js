import React, { Component } from 'react';
// import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
// import ImageStats from '../imageStats/ImageStats';
import RegionStats from '../regionStats/RegionStats';
import actions from './actions';

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.props.dispatch(actions.setupStats());
  }
  render() {
    return (
      <div>
        {/* <ImageStats /> */}
        <RegionStats />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  // stats: state.StatsDB.stats,
});

export default connect(mapStateToProps)(Statistics);

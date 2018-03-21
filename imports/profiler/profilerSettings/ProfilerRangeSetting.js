import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfilerRangeSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>test2</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // profilerMainSetting: state.ProfilerDB.profilerMainSetting,
  profilerSettings: state.ProfilerDB.profilerSettings,
});

export default connect(mapStateToProps)(ProfilerRangeSetting);

import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfilerFitSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>test4</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // profilerMainSetting: state.ProfilerDB.profilerMainSetting,
  profilerSettings: state.ProfilerDB.profilerSettings,
});

export default connect(mapStateToProps)(ProfilerFitSetting);

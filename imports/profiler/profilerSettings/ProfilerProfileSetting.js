import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfilerProfileSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>test3</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // profilerMainSetting: state.ProfilerDB.profilerMainSetting,
  profilerSettings: state.ProfilerDB.profilerSettings,
});

export default connect(mapStateToProps)(ProfilerProfileSetting);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from './actions';

class AutoClipping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoClip: [false, true],
    };
  }

  handleAutoClip = (autoClip) => {
    this.props.dispatch(actions.updateAutoClipping(autoClip));
    this.props.dispatch(actions.getAutoClipState());
  }

  render() {
    const autoClips = this.state.autoClip;
    let autoClipButtons = null;
    autoClipButtons = autoClips.map(autoClip =>
      (<button className="button" onClick={() => this.handleAutoClip(autoClip)} type="button">
        {`${autoClip}`}
      </button>),
    );

    return (
      <div>
        <h3>Clipping per frame for percentile:</h3>
        {autoClipButtons}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { AutoClippingDB } = state;
  const { autoClip } = AutoClippingDB;
  return {
    autoClip,
  };
};

export default connect(mapStateToProps)(AutoClipping);

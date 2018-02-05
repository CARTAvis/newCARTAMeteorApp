import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from './actions';

const percentileArray = [0.9, 0.925, 0.95, 0.96, 0.97, 0.98, 0.99, 0.995, 0.999, 1.0];
const autoClipArray = [false, true];

class Clipping extends Component {
  handleClip = (percentile) => {
    this.props.dispatch(actions.updateClipping(percentile));
    this.props.dispatch(actions.getClipState());
  }

  handleAutoClip = (autoClip) => {
    this.props.dispatch(actions.updateAutoClipping(autoClip));
    this.props.dispatch(actions.getAutoClipState());
  }

  render() {
    const percentiles = percentileArray;
    let percentileButtons = null;
    percentileButtons = percentiles.map(percentile =>
      (<button key={percentile.toString()} className="clippingButton" onClick={() => this.handleClip(percentile)} type="button">
        {`${percentile * 100}%`}
      </button>),
    );

    const autoClips = autoClipArray;
    let autoClipButtons = null;
    autoClipButtons = autoClips.map(autoClip =>
      (<button key={autoClip.toString()} className="clippingButton" onClick={() => this.handleAutoClip(autoClip)} type="button">
        {`${autoClip}`}
      </button>),
    );

    return (
      <div>
        <h3>{'Clipping for percentile:'}</h3>
        {percentileButtons}

        <h3>{'Clipping per frame for percentile:'}</h3>
        {autoClipButtons}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { ClippingDB } = state;
  const { percentile, autoClip } = ClippingDB;
  return {
    percentile,
    autoClip,
  };
};

export default connect(mapStateToProps)(Clipping);

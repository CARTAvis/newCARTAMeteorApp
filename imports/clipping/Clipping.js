import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from './actions';

class Clipping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentile: [0.9, 0.925, 0.95, 0.96, 0.97, 0.98, 0.99, 0.995, 0.999, 1.0],
    };
    // this.props.dispatch(actions.setupClipping(this.state.percentile[9]));
  }

  handleClip = (percentile) => {
    this.props.dispatch(actions.updateClipping(percentile));
    this.props.dispatch(actions.getClipState());
  }

  render() {
    const percentiles = this.state.percentile;
    let percentileButtons = null;
    percentileButtons = percentiles.map(percentile =>
      (<button className="button" onClick={() => this.handleClip(percentile)} type="button">
        {`${percentile * 100}%`}
      </button>),
    );

    return (
      <div>
        <h3>Clipping for percentile:</h3>
        {percentileButtons}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { ClippingDB } = state;
  const { percentile } = ClippingDB;
  return {
    percentile,
  };
};

export default connect(mapStateToProps)(Clipping);

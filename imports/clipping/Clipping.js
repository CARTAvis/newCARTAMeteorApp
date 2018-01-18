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

  clip0 = () => {
    this.props.dispatch(actions.updateClipping(this.state.percentile[0]));
    this.props.dispatch(actions.getClipState());
  }
  clip1 = () => {
    this.props.dispatch(actions.updateClipping(this.state.percentile[1]));
    this.props.dispatch(actions.getClipState());
  }
  clip2 = () => {
    this.props.dispatch(actions.updateClipping(this.state.percentile[2]));
    this.props.dispatch(actions.getClipState());
  }
  clip3 = () => {
    this.props.dispatch(actions.updateClipping(this.state.percentile[3]));
    this.props.dispatch(actions.getClipState());
  }
  clip4 = () => {
    this.props.dispatch(actions.updateClipping(this.state.percentile[4]));
    this.props.dispatch(actions.getClipState());
  }
  clip5 = () => {
    this.props.dispatch(actions.updateClipping(this.state.percentile[5]));
    this.props.dispatch(actions.getClipState());
  }
  clip6 = () => {
    this.props.dispatch(actions.updateClipping(this.state.percentile[6]));
    this.props.dispatch(actions.getClipState());
  }
  clip7 = () => {
    this.props.dispatch(actions.updateClipping(this.state.percentile[7]));
    this.props.dispatch(actions.getClipState());
  }
  clip8 = () => {
    this.props.dispatch(actions.updateClipping(this.state.percentile[8]));
    this.props.dispatch(actions.getClipState());
  }
  clip9 = () => {
    this.props.dispatch(actions.updateClipping(this.state.percentile[9]));
    this.props.dispatch(actions.getClipState());
  }

  render() {
    return (
      <div>
        <h3>Clipping for percentile:</h3>
        <button className="button" onClick={this.clip0} type="button">
          {`${this.state.percentile[0] * 100}%`}
        </button>
        <button className="button" onClick={this.clip1} type="button">
          {`${this.state.percentile[1] * 100}%`}
        </button>
        <button className="button" onClick={this.clip2} type="button">
          {`${this.state.percentile[2] * 100}%`}
        </button>
        <button className="button" onClick={this.clip3} type="button">
          {`${this.state.percentile[3] * 100}%`}
        </button>
        <button className="button" onClick={this.clip4} type="button">
          {`${this.state.percentile[4] * 100}%`}
        </button>
        <button className="button" onClick={this.clip5} type="button">
          {`${this.state.percentile[5] * 100}%`}
        </button>
        <button className="button" onClick={this.clip6} type="button">
          {`${this.state.percentile[6] * 100}%`}
        </button>
        <button className="button" onClick={this.clip7} type="button">
          {`${this.state.percentile[7] * 100}%`}
        </button>
        <button className="button" onClick={this.clip8} type="button">
          {`${this.state.percentile[8] * 100}%`}
        </button>
        <button className="button" onClick={this.clip9} type="button">
          {`${this.state.percentile[9] * 100}%`}
        </button>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from './actions';

class AutoClipping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoClip: [false, true],
    };
    // this.props.dispatch(actions.setupAutoClipping(this.state.autoClip[0]));
  }

  autoClip0 = () => {
    this.props.dispatch(actions.updateAutoClipping(this.state.autoClip[0]));
    this.props.dispatch(actions.getAutoClipState());
  }
  autoClip1 = () => {
    this.props.dispatch(actions.updateAutoClipping(this.state.autoClip[1]));
    this.props.dispatch(actions.getAutoClipState());
  }

  render() {
    return (
      <div>
        <h3>Clipping per frame for percentile:</h3>
        <button className="button" onClick={this.autoClip0} type="button">
          {`${this.state.autoClip[0]}`}
        </button>
        <button className="button" onClick={this.autoClip1} type="button">
          {`${this.state.autoClip[1]}`}
        </button>
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

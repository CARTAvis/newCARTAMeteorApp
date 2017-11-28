// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import actions from './actions';

type HistogramProps = {
  dispatch: any;
}

type HistogramState = {
  +HistogramDB: any;
}

class Histogram extends React.Component<HistogramProps, HistogramState> {
  constructor(props) {
    super(props);
    this.state = {
      HistogramDB: null,
    };
    this.props.dispatch(actions.setupHistogram());
  }
  render() {
    return (
      <div>
        <p>Histogram</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.HistogramDB.data,
});

export default connect(mapStateToProps)(Histogram);

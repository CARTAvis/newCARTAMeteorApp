import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import actions from './actions';

class Histogram extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.dispatch(actions.setupHistogram());
  }
  componentDidMount = () => {
    // console.log('componentDidMount', this.props);
    const trace1 = {
      type: 'bar',
    };
    const layout = {
      height: 395,
      margin: {
        l: 40,
        r: 40,
        t: 50,
        b: 50,
      },
    };
    const data = [trace1];
    Plotly.newPlot(this.el, data, layout);
    this.el.on('plotly_hover', (e) => {
      this.props.dispatch(actions.onHover(e));
    });
    this.el.on('plotly_relayout', (e) => {
      if (!e.width) {
        this.props.dispatch(actions.onZoomPan(e));
      }
    });
  }
  relayoutOnHover = () => {
    Plotly.Fx.hover(this.el, [this.props.data]);
  }
  relayoutOnZoomPan = () => {
    let data = null;
    data = {};
    if (this.props.zoomPanData.xRange) data['xaxis.range'] = this.props.zoomPanData.xRange;
    if (this.props.zoomPanData.yRange) data['yaxis.range'] = this.props.zoomPanData.yRange;
    if (this.props.zoomPanData.xAutorange) data['xaxis.autorange'] = this.props.zoomPanData.xAutorange;
    if (this.props.zoomPanData.yAutorange) data['yaxis.autorange'] = this.props.zoomPanData.yAutorange;
    Plotly.relayout(this.el, data);
  }
  adjustChartWidth = () => {
    const layout = {
      width: this.props.width - 20,
    };
    Plotly.relayout(this.el, layout);
  }
  plotHistogram = () => {
    if (this.props.histogramData) {
      console.log('PLOTTING HISTOGRAM');

      Plotly.deleteTraces(this.el, -1);
      const data = [{
        x: this.props.histogramData.x,
        y: this.props.histogramData.y,
        // x: [1, 1, 2, 3, 4, 5],
        // y: [0.5, 1, 2, 0, 3, 0],
        type: 'bar',
        // connectgaps: true,
      }];
      if (this.props.displayType === 'lines') {
        data[0].marker = {
          color: 'rgba(255, 255, 255, 0)',
          line: {
            color: 'rbg(8,48,107)',
            width: 1.5,
          },
        };
      }
      const layout = {
        bargap: 0,
        yaxis: {
          type: this.props.histogramSettings.logCount === false ? 'linear' : 'log',
          // rangemode: 'tozero',
        },
        xaxis: {
          range: [0, 10000],
        },
      };
      Plotly.addTraces(this.el, data);
      Plotly.relayout(this.el, layout);
    }
  }
  render() {
    const { histogramData, displayType, histogramSettings, width, data, zoomPanData } = this.props;
    // histogram settings is loaded into the db when empty plot is produced,
    // need to check if there's available data in the function called
    if (histogramData || displayType || histogramSettings) {
      this.plotHistogram();
    }
    // width comes in before the plot reference is generated, so need
    // to check for this.el
    if (width && this.el) {
      this.adjustChartWidth();
    }
    if (data) {
      this.relayoutOnHover();
    }
    if (zoomPanData) {
      this.relayoutOnZoomPan();
    }
    return (
      <div>
        <div
          style={{ marginTop: '15px' }}
          ref={(el) => {
            this.el = el;
          }}
          id="histogram"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  displayType: state.HistogramDB.displayType,
  histogramSettings: state.HistogramSettingsDB.histogramSettings,
  histogramData: state.HistogramDB.histogramData,
  data: state.HistogramDB.data,
  zoomPanData: state.HistogramDB.zoomPanData,
});

export default connect(mapStateToProps)(Histogram);


// import {a, b a, c } from a.js
//
// import testtest from a.js

// const originalLayouts = getFromLS('layouts') || {};

import 'react-resizable/css/styles.css';
import 'react-grid-layout/css/styles.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from './actions';
import Histogram from '../histogram/Histogram';
import Profiler from '../profiler/Profiler';
import Statistics from '../statistics/Statistics';
import settingsActions from '../settings/actions';
// const _ = require('lodash');
// const PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
// const WidthProvider = require('react-grid-layout').WidthProvider;
// const ResponsiveReactGridLayout = require('react-grid-layout').Responsive;
const ReactGridLayout = require('react-grid-layout');

class FeatureContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    // this.props.dispatch(actions.onAddItemDB('Statistics'));
  }
  onRemoveItem(i, type) {
    // this.setState({ items: _.reject(this.state.items, { i }) });
    this.props.dispatch(actions.onRemoveItemDB(i));
    this.props.dispatch(settingsActions.removeSetting(type));
  }
  onAddItem = (data) => {
    this.props.dispatch(actions.onAddItemDB(data));
  }
  setSetting(settingType) {
    this.props.dispatch(settingsActions.setSetting(settingType));
  }
  addGraph = (type) => {
    // console.log(`TYPE: ${type}`);
    if (type === 'Histogram') {
      return <Histogram width={this.props.width} />;
    } else if (type === 'Profiler') {
      return <Profiler width={this.props.width} />;
    } else if (type === 'Statistics') {
      return <Statistics />;
    }
    return '';
  }
  createElement = (el) => {
    const removeStyle = {
      position: 'absolute',
      right: '2px',
      top: 0,
      cursor: 'pointer',
    };
    // const i = el.add ? '+' : el.i;
    return (
      <div
        key={el.i}
        data-grid={el}
        style={{ backgroundColor: 'white' }}
      >
        <button className="remove" style={removeStyle} onClick={() => this.onRemoveItem(el.i, el.type)}>x</button>
        <button style={{ position: 'absolute', right: '23px', top: 0 }} onClick={() => this.setSetting(el.type)}>Setting</button>
        {/* {el.add ?
          <span className="add text" onClick={this.onAddItem}>Add +</span>
          : <span className="text">{i}</span>} */}
        {/* <span className="text">{el.i}</span> */}
        {this.addGraph(el.type)}
        {/* <div style={{
 position: 'absolute', top: 0, backgroundColor: 'blue', right: 0, width: this.props.width - 20,
}}
        > */}
        {/* <button onClick={() => this.setSetting(el.type)}>Setting</button> */}
        {/* </div> */}
      </div>
    );
  }
  render() {
    console.log('RENDER FC');
    const width = this.props.width;
    return (
      <div
        style={{ minHeight: '100vh' }}
        // ref={(node) => { this.gridLayout = node; }}
      >
        {/* <button onClick={this.onAddItem('none')}>Add Item</button> */}
        <ReactGridLayout
          {...this.props}
          autoSize
          // onBreakpointChange={this.onBreakpointChange}
          cols={1}
          width={width}
          rowHeight={210}
          layout={this.props.items}
          // isDraggable={!this.props.disableDragging}
          // onDrag={() => {
          //   this.props.dispatch(actions.isDragging(true));
          // }}
          onDragStop={(e) => {
            this.props.dispatch(actions.onDragStopDB(e));
          }}
        >
          {/* {_.map(this.state.items, (s)=>this.createElement(s))} */}
          {/* {this.state.items.map(this.createElement)} */}
          {this.props.items ? this.props.items.map(item => this.createElement(item)) : false}

        </ReactGridLayout>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  items: state.FeatureContainerDB.items,
  disableDragging: state.FeatureContainerDB.disableDragging,
});
export default connect(mapStateToProps, null, null, { withRef: true })(FeatureContainer);
// export default FeatureContainer;

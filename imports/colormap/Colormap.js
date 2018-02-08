import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { Rect, Group, Text } from 'react-konva';
import actions from './actions';


class Colormap extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.props.dispatch(actions.setupColormap());
  }
  render() {
    const { min, max, stops, colorMapName } = this.props;
    // const newStops = stops.map((value, index) => {
    //   return
    // });
    let total = 0;
    if (stops) {
      total = stops.length;
    }
    const newStops = [];
    for (let i = 0; i < total; i += 1) {
      newStops.push(i / total, stops[i]);
    }
    return (
      // <div>
      //   Min:{min}
      //   <br />
      //   Max:{max}
      //   <br />
      //   colorName:{colorMapName}
    /* <Stage width={50} height={300}>
          <Layer> */
      <Group>
        <Text
          y={0}
          width={50}
          fill="white"
          text={max}
        />
        <Text
          y={320}
          width={50}
          fill="white"
          text={min}
        />
        <Text
          y={340}
          width={100}
          fill="white"
          text={colorMapName}
        />
        <Rect
          // x={482}
          y={20}
          width={50}
          height={300}
          stroke="white"
          fillLinearGradientStartPoint={{ x: 0, y: 300 }}
          fillLinearGradientEndPoint={{ x: 0, y: 20 }}
          fillLinearGradientColorStops={newStops}
        />
      </Group>
    /* </Layer>
        </Stage> */
      // </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { ColormapDB } = state;
  const { min, max, stops, colorMapName } = ColormapDB;
  return {
    min,
    max,
    stops,
    colorMapName,
  };
};

export default connect(mapStateToProps)(Colormap);

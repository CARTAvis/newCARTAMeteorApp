import React, { Component } from 'react';
import actions from './actions';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import NumericInput from 'react-numeric-input';
import Slider from 'material-ui/Slider';
import IconButton from 'material-ui/IconButton';
import SkipPrev from 'material-ui/svg-icons/av/skip-previous';
import SkipNext from 'material-ui/svg-icons/av/skip-next';
import Stop from 'material-ui/svg-icons/av/stop';
import PlayForward from 'material-ui/svg-icons/av/play-arrow';

const Image = 'Image';
const Channel = 'Channel';
const Stokes = 'Stokes';

class Animator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Image,
    };
    this.props.dispatch(actions.setupAnimator());
  }

  handleChangeTab = (value) => {
    this.setState({
      value,
    });
  };

  changeFrame = (event, index, value) => {
    console.log('change frame');
  }

  render() {
    let imageSelection = {};
    let channelSelection = {};
    let stokesSeleciton = {};

    let imageLabel = Image;
    let channelLabel = Channel;
    let stokesLabel = Stokes;
    if (this.props.animatorTypeList && this.props.animatorTypeList.length > 0) {
      for (const animatorType of this.props.animatorTypeList) {
        console.log('render animatorTypeList');
        let currentIndex = null;
        // if (animatorType.selection.frame) {
        currentIndex = (animatorType.selection.frame) + 1;
        // }
        let total = null;
        // if (animatorType.selection.frameEnd) {
        total = animatorType.selection.frameEnd;
        // }
        const label = <div>{animatorType.type}<br /><sub>{`${currentIndex}/${total}`}</sub></div>;

        switch (animatorType.type) {
          case Image:
            imageSelection = animatorType.selection;
            imageLabel = label;
            break;
          case Channel:
            channelSelection = animatorType.selection;
            channelLabel = label;
            break;
          case Stokes:
            stokesSeleciton = animatorType.selection;
            console.log('stoke label:', stokesLabel);
            stokesLabel = label;
        }
      }
    }


    let currentSelection = {};
    console.log('this animator value:', this.state.value);
    switch (this.state.value) {
      case Image:
        currentSelection = imageSelection;
        break;
      case Channel:
        currentSelection = channelSelection;
        console.log('switch to channel:', channelSelection);
        break;
      case Stokes:
        currentSelection = stokesSeleciton;
        break;
    }

    const menuItems = [];
    for (let i = 1; i <= currentSelection.frameEnd; i++) {
      if (currentSelection != imageSelection) {
        menuItems.push(<MenuItem value={i} key={i} primaryText={i} />);
      } else {
        const file = currentSelection.fileList[i - 1];
        menuItems.push(<MenuItem value={i} key={i} primaryText={`${i} ${file}`} />);
      }
    }

    return (
      <div>
        <Paper style={{ width: 482, height: 200, backgroundColor: 'lightgrey' }} zDepth={2}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChangeTab}
          >
            <Tab label={imageLabel} value={Image} />
            <Tab label={channelLabel} value={Channel} />
            <Tab label={stokesLabel} value={Stokes} />
          </Tabs>
          <div style={{ display: 'flex', flexDirection: 'row', height: '20%' }}>
            <DropDownMenu value={currentSelection.frame + 1} underlineStyle={{ color: 'black' }} onChange={this.changeFrame}>
              {/* <MenuItem value={1} primaryText="Image 0" /> */}
              {menuItems}
            </DropDownMenu>
            {/* <p>&#8804; {currentSelection.frameEnd}</p> */}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', height: '20%' }}>
            <div style={{ marginTop: '15px' }}>
              <NumericInput style={{ wrap: { height: '30px', width: '50px' }, input: { height: '30px', width: '50px' } }} min={1} max={currentSelection.frameEnd} value={currentSelection.frameStartUser + 1} />
            </div>
            <div>
              <Slider sliderStyle={{ width: '350px', left: '10px', height: '2px' }} step={1} min={1} max={currentSelection.frameEnd} value={currentSelection.frame + 1} />
            </div>
            <div style={{ marginLeft: '30px', marginTop: '15px' }}>
              <NumericInput style={{ wrap: { height: '30px', width: '50px' }, input: { height: '30px', width: '50px' } }} min={1} max={currentSelection.frameEnd} value={currentSelection.frameEndUser + 1} />
            </div>
          </div>
          <div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'row', height: '50%', margin: 'auto', width: '40%' }}>
            <IconButton style={{ transform: 'rotate(180deg)' }}>
              <PlayForward />
            </IconButton>
            <IconButton>
              <SkipPrev />
            </IconButton>
            <IconButton>
              <Stop />
            </IconButton>
            <IconButton>
              <SkipNext />
            </IconButton>
            <IconButton>
              <PlayForward />
            </IconButton>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  animatorTypeList: state.AnimatorDB.animatorTypeList,
});

export default connect(mapStateToProps)(Animator);

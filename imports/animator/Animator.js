import React, { Component } from 'react';
/* material-ui beta */
import Paper from 'material-ui-next/Paper';
import Tabs, { Tab } from 'material-ui-next/Tabs';
import AppBar from 'material-ui-next/AppBar';
import IconButton from 'material-ui-next/IconButton';
import SkipPrev from 'material-ui-icons/SkipPrevious';
import SkipNext from 'material-ui-icons/SkipNext';
import Stop from 'material-ui-icons/Stop';
import PlayForward from 'material-ui-icons/PlayArrow';
import Select from 'material-ui-next/Select';
import { MenuItem } from 'material-ui-next/Menu';

// import DropDownMenu from 'material-ui/DropDownMenu';
import NumericInput from 'react-numeric-input';
import Slider from 'material-ui/Slider';

import actions from './actions';
import { connect } from 'react-redux';


const Image = 'Image';
const Channel = 'Channel';
const Stokes = 'Stokes';
const Region = 'Region';
// const styles = {
//   root: {
//     minWidth: 40,
//   },
// };
//
// @withStyles(styles)
class Animator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Image,
    };
    this.props.dispatch(actions.setupAnimator());
  }

  handleChangeTab = (event, value) => {
    // this.setState({
    //   value,
    // });
    this.props.dispatch(actions.changeAnimatorType(value));
  };

  handleSlider = (event, value) => {
    // this.setState({firstSlider: value});
    console.log('silder value:', value);
    this.changeFrame(value - 1);
    // this.changeFrame(event, value - 1, value);
  };

  changeFrame = (index) => {
    // index: 0 ;value: 1 (we start from 1 for UI)
    const { animatorTypeList } = this.props;
    const currentAnimatorType = this.props.currentAnimatorType ? this.props.currentAnimatorType : Image;

    if (animatorTypeList && animatorTypeList.length > 0) {
      for (const animatorType of animatorTypeList) {
        if (animatorType.type == currentAnimatorType) {
          // console.log('current animatorTypeID:', animatorType.animatorTypeID);
          if (animatorType.type == Image) {
            this.props.dispatch(actions.changeImageFrame(animatorType.animatorTypeID, index));
          } else {
            this.props.dispatch(actions.changeNonImageFrame(animatorType, index));
          }
          return;
        }
      }
    }
  }

  render() {
    const { animatorTypeList } = this.props;
    let imageSelection = {};
    let channelSelection = {};
    let stokesSeleciton = {};

    let imageLabel = Image;
    let channelLabel = Channel;
    let stokesLabel = Stokes;
    const regionLabel = Region;
    if (animatorTypeList && animatorTypeList.length > 0) {
      for (const animatorType of animatorTypeList) {
        // console.log('render animatorTypeList');
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
            // console.log('stoke label:', stokesLabel);
            stokesLabel = label;
        }
      }
    }

    let currentSelection = {};
    const currentAnimatorType = this.props.currentAnimatorType ? this.props.currentAnimatorType : Image;
    // console.log('this animator value:', currentAnimatorType);// this.state.value);
    switch (currentAnimatorType) {
      case Image:
        currentSelection = imageSelection;
        break;
      case Channel:
        currentSelection = channelSelection;
        // console.log('switch to channel:', channelSelection);
        break;
      case Stokes:
        currentSelection = stokesSeleciton;
        break;
    }

    const menuItems = [];
    for (let i = 1; i <= currentSelection.frameEnd; i += 1) {
      if (currentSelection !== imageSelection) {
        menuItems.push(<MenuItem value={i} key={i}>{i}</MenuItem>);
      } else {
        const file = currentSelection.fileList[i - 1];
        menuItems.push(<MenuItem value={i} key={i}>{i} {file}</MenuItem>);
      }
    }
    const w = this.props.firstColumnWidth / 4;
    const tabStyle = {
      minWidth: w,
      width: w,
    };
    return (
      <div>
        <Paper style={{ width: this.props.firstColumnWidth, height: 150, backgroundColor: 'lightgrey' }}>
          <AppBar position="static">
            <Tabs
              value={currentAnimatorType}
              onChange={this.handleChangeTab}
            >
              <Tab style={tabStyle} label={imageLabel} value={Image} />
              <Tab style={tabStyle} label={channelLabel} value={Channel} />
              <Tab style={tabStyle} label={stokesLabel} value={Stokes} />
              <Tab style={tabStyle} label={regionLabel} value={Region} />
            </Tabs>
          </AppBar>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
              <div style={{
 display: 'flex', flexDirection: 'row',
}}
              >
                <div style={{ flex: 1 }}>
                  {/* <DropDownMenu
                    value={currentSelection.frame + 1}
                    underlineStyle={{ color: 'black' }}
                    onChange={this.changeFrame}
                  > */}
                  <Select
                    value={currentSelection.frame + 1}
                    onChange={(event) => { this.changeFrame(event.target.value - 1); }}
                    style={{ maxWidth: w }}
                  >
                    {menuItems}
                  </Select>
                  {/* </DropDownMenu> */}
                </div>
                <div style={{ flex: 4 }}>
                  <div style={{
 display: 'flex', alignItems: 'center', justifyContent: 'center',
}}
                  >
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
                </div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'flex', flexDirection: 'row',
              }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <NumericInput
                      style={{ wrap: { height: '30px', width: '50px' }, input: { height: '30px', width: '50px' } }}
                      min={1}
                      max={currentSelection.frameEnd}
                      value={currentSelection.frameStartUser + 1}
                    />
                  </div>
                </div>
                <div style={{ flex: 3 }}>
                  <Slider sliderStyle={{ margin: 0, paddingTop: 0 }} step={1} min={currentSelection.frameEnd > 1 ? 1 : null} max={currentSelection.frameEnd} value={currentSelection.frame + 1} onChange={this.handleSlider} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <NumericInput style={{ wrap: { height: '30px', width: '50px' }, input: { height: '30px', width: '50px' } }} min={1} max={currentSelection.frameEnd} value={currentSelection.frameEndUser + 1} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  animatorTypeList: state.AnimatorDB.animatorTypeList,
  currentAnimatorType: state.AnimatorDB.currentAnimatorType,
});

export default connect(mapStateToProps)(Animator);

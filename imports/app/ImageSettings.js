import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import GridControl from '../gridControl/GridControl.js';

export default class ImageSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subOption: '',
    };
  }
<<<<<<< HEAD
  // getContent = info =>
  //   this.setState({ info });
  //   info
=======

>>>>>>> 53eee3262e018031a4c61fa2e86d52c57c0ebc13
  setOption = (option) => {
    this.setState({ option });
  }
  setSubOption = (subOption) => {
    this.setState({ subOption });
  }
  showContent = () => {
<<<<<<< HEAD
    if (this.state.option) {
      if (this.state.subOption) {
        return <GridControl option={this.state.subOption} />;
      }
=======
    if (this.state.subOption) {
      return <GridControl option={this.state.subOption} />;
>>>>>>> 53eee3262e018031a4c61fa2e86d52c57c0ebc13
    }
    return null;
  }
  render() {
    // console.log('suboption: ', this.state.subOption);
<<<<<<< HEAD
    const style = {
      display: 'inline-block',
      float: 'left',
      margin: '5px 5px 5px 5px',
    };
    // const grid = <GridControl option={this.state.subOption} />;
    return (
      <div>
        <Paper style={style}>
          <Menu
            onChange={(event, value) => { this.setOption(value); }}
          >
            {/* <MenuItem
              primaryText="grid"
              rightIcon={<ArrowDropRight />}
              menuItems={[
                <GridControl getContent={this.getContent} />,
              ]}
            /> */}
            <MenuItem
              primaryText="grid"
              rightIcon={<ArrowDropRight />}
              value="grid"
              menuItems={[
                <MenuItem primaryText="canvas" onClick={() => { this.setSubOption('canvas'); }} />,
                <MenuItem primaryText="grid" onClick={() => { this.setSubOption('grid'); }} />,
                <MenuItem primaryText="axes/border" onClick={() => { this.setSubOption('axes'); }} />,
                <MenuItem primaryText="labels" onClick={() => { this.setSubOption('labels'); }} />,
                <MenuItem primaryText="ticks" onClick={() => { this.setSubOption('ticks'); }} />,
              ]}
            />
            <MenuItem primaryText="contour" value="contour" />
            <MenuItem primaryText="stack" />
            <MenuItem primaryText="regions" />
          </Menu>
        </Paper>
        <div style={style}>{this.showContent()}</div>
=======
    // const grid = <GridControl option={this.state.subOption} />;
    return (
      <div className="test2">
        <div className="test3">
          <div className="test4">
            <Menu
              onChange={(event, value) => { this.setOption(value); }}
            >
              {/* <MenuItem
                primaryText="grid"
                rightIcon={<ArrowDropRight />}
                menuItems={[
                  <GridControl getContent={this.getContent} />,
                ]}
              /> */}
              <MenuItem
                primaryText="grid"
                rightIcon={<ArrowDropRight />}
                value="grid"
                menuItems={[
                  <MenuItem primaryText="canvas" onClick={() => { this.setSubOption('canvas'); }} />,
                  <MenuItem primaryText="grid" onClick={() => { this.setSubOption('grid'); }} />,
                  <MenuItem primaryText="axes/border" onClick={() => { this.setSubOption('axes'); }} />,
                  <MenuItem primaryText="labels" onClick={() => { this.setSubOption('labels'); }} />,
                  <MenuItem primaryText="ticks" onClick={() => { this.setSubOption('ticks'); }} />,
                ]}
              />
              <MenuItem primaryText="contour" value="contour" />
              <MenuItem primaryText="stack" />
              <MenuItem primaryText="regions" />
            </Menu>
          </div>
          <div id="data" className="test5">
            <GridControl option={this.state.subOption} />
          </div>
        </div>
>>>>>>> 53eee3262e018031a4c61fa2e86d52c57c0ebc13
        {/* <div style={style}><GridControl option={this.state.subOption} /></div> */}
      </div>
    );
  }
}

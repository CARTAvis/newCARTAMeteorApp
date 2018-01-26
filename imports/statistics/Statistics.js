import React, { Component } from 'react';
// import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import actions from './actions';

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: '',
    };
    this.props.dispatch(actions.setupStats());
  }
  // when mounting
  componentDidMount = () => {
    if (this.props.stats && this.props.selectedIndex >= 0) {
      this.showStats(this.props.stats, this.props.selectedIndex);
    }
  }
  componentWillReceiveProps = (nextProps) => {
    console.log('NEXT PROPS: ', nextProps);
    // always get the topmost image when we're just opening new images
    if (nextProps.stats && (nextProps.selectedIndex >= 0)) {
      // console.log(nextProps.stats);
      this.showStats(nextProps.stats, nextProps.selectedIndex);
    }
    // update displayed stats when switching between images
    // if (nextProps.newFrameIndex >= 0) {
    //   this.showStats(this.props.stats, nextProps.newFrameIndex);
    // }
  }
  showStats = (stats, index) => {
    const statsObj = stats[index];
    console.log('statsObj: ', statsObj);
    const info = statsObj[0];
    // this.setState({ currentImage: info.Name });
    const p = document.getElementById('p');
    p.innerHTML = '';
    for (const key in info) {
      if (key !== 'Name' && info.hasOwnProperty(key)) {
        // console.log(info[key]);
        p.appendChild(document.createTextNode(`${key}: ${info[key]}`));
        p.appendChild(document.createElement('br'));
      }
    }
  }
  handleChange = (event, index, value) => {
    this.setState({ currentImage: value });
    this.showStats(this.props.stats, index);
  }
  render() {
    return (
      <div>
        {/* {this.props.stats ?
          <DropDownMenu value={this.state.currentImage} onChange={this.handleChange}>
            {this.props.stats.map(item =>
              (<MenuItem
                value={item[0].Name}
                key={Math.floor(Math.random() * 1000)}
                primaryText={item[0].Name}
              />))}
          </DropDownMenu> : null} */}
        <p id="p" />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  stats: state.StatsDB.stats,
  selectedIndex: state.StatsDB.selectedIndex,
});

export default connect(mapStateToProps)(Statistics);

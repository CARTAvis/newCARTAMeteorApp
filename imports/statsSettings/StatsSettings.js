import React, { Component } from 'react';
import { connect } from 'react-redux';
/* material-ui beta */
import Chip from 'material-ui-next/Chip';
import blue from 'material-ui-next/colors/blue';
import actions from './actions';

class StatsSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  toggle = (visible, name, type) => {
    // console.log('TOGGLING');
    if (visible) {
      this.props.dispatch(actions.setStatVisible(false, name, type));
    } else {
      this.props.dispatch(actions.setStatVisible(true, name, type));
    }
  }
  render() {
    const blue300 = blue[300];
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {this.props.image.map(item =>
              (<Chip
                key={Math.floor(Math.random() * 10000)}
                style={{ backgroundColor: item.visible ? blue300 : '' }}
                // backgroundColor={item.visible ? blue300 : ''}
                label={item.label}
                onClick={() => { this.toggle(item.visible, item.label, 'image'); }}
              />))}
          </div>
        </div>
        <br />
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {this.props.region.map(item =>
              (<Chip
                key={Math.floor(Math.random() * 10000)}
                style={{ backgroundColor: item.visible ? blue300 : '' }}
                // backgroundColor={item.visible ? blue300 : ''}
                onClick={() => { this.toggle(item.visible, item.label, 'region'); }}
                label={item.label}
              />))}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  image: state.StatsSettingsDB.image,
  region: state.StatsSettingsDB.region,
});

export default connect(mapStateToProps)(StatsSettings);

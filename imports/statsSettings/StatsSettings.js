import React, { Component } from 'react';
// import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import Chip from 'material-ui/Chip';
import { blue300 } from 'material-ui/styles/colors';
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
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {this.props.image.map(item =>
              (<Chip
                key={Math.floor(Math.random() * 10000)}
                backgroundColor={item.visible ? blue300 : ''}
                onClick={() => { this.toggle(item.visible, item.label, 'image'); }}
              >{item.label}</Chip>),
            )}
          </div>
        </div>
        <br />
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {this.props.region.map(item =>
              (<Chip
                key={Math.floor(Math.random() * 10000)}
                backgroundColor={item.visible ? blue300 : ''}
                onClick={() => { this.toggle(item.visible, item.label, 'region'); }}
              >{item.label}</Chip>),
            )}
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

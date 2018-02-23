import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

export default class HistogramSettings extends Component {
  constructor(props) {
    console.log('HISTOGRAM SETTINGS');
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div style={{ flex: 1 }}>
        <TextField
          defaultValue="10"
          floatingLabelText="count"
        />
        <br />
        <TextField
          defaultValue="886.308"
          floatingLabelText="width"
        />
      </div>
    );
  }
}

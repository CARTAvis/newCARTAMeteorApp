// @flow

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import type { HistogramState } from '../shared/state.models';

export const HistogramDB: HistogramState = new Mongo.Collection('histogramdb');
// $FlowFixMe
HistogramDB.cartaSet = 'histogramdb';

if (Meteor.isServer) {
  console.log('publish HistogramD on server');
  // $FlowFixMe
  Meteor.publish(HistogramDB.cartaSet, sessionID => HistogramDB.find({ sessionID }));
}
export default HistogramDB;

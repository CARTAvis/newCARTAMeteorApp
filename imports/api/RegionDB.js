// @flow
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import type { RegionState } from '../shared/state.models';

export const RegionDB: RegionState = new Mongo.Collection('regiondb');
// $FlowFixMe
RegionDB.cartaSet = 'regiondb';

if (Meteor.isServer) {
  console.log('publish regionDB on server');
  // $FlowFixMe
  Meteor.publish(RegionDB.cartaSet, sessionID => RegionDB.find({ sessionID }));
}
export default RegionDB;

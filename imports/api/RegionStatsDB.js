import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const RegionStatsDB = new Mongo.Collection('regionstatsdb');
RegionStatsDB.cartaSet = 'regionstatsdb';

if (Meteor.isServer) {
  console.log('publish regionDB on server');
  Meteor.publish(RegionStatsDB.cartaSet, sessionID => RegionStatsDB.find({ sessionID }));
}
export default RegionStatsDB;

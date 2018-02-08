import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const StatsDB = new Mongo.Collection('statsdb');
StatsDB.cartaSet = 'statsdb';

if (Meteor.isServer) {
  console.log('publish regionDB on server');
  Meteor.publish(StatsDB.cartaSet, sessionID => StatsDB.find({ sessionID }));
}
export default StatsDB;

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const StatsSettingsDB = new Mongo.Collection('statsSettingsdb');
StatsSettingsDB.cartaSet = 'statsSettingsdb';

if (Meteor.isServer) {
  console.log('publish StatsSettingsDB on server');
  Meteor.publish(StatsSettingsDB.cartaSet, sessionID => StatsSettingsDB.find({ sessionID }));
}
export default StatsSettingsDB;

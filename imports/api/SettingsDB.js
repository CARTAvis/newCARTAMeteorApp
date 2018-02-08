import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const SettingsDB = new Mongo.Collection('settingsdb');
SettingsDB.cartaSet = 'settingsdb';

if (Meteor.isServer) {
  console.log('publish regionDB on server');
  Meteor.publish(SettingsDB.cartaSet, sessionID => SettingsDB.find({ sessionID }));
}
export default SettingsDB;

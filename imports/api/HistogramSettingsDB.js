import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const HistogramSettingsDB = new Mongo.Collection('histogramsettingsdb');
HistogramSettingsDB.cartaSet = 'histogramsettingsdb';

if (Meteor.isServer) {
  console.log('publish HistogramD on server');
  Meteor.publish(HistogramSettingsDB.cartaSet, sessionID => HistogramSettingsDB.find({ sessionID }));
}
export default HistogramSettingsDB;

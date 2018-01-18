import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const AutoClippingDB = new Mongo.Collection('autoclippingdb');
AutoClippingDB.cartaSet = 'autoclippingdb';

if (Meteor.isServer) {
  console.log('publish AutoClippingDB on server');
  Meteor.publish(AutoClippingDB.cartaSet, sessionID => AutoClippingDB.find({ sessionID }));
}
export default AutoClippingDB;

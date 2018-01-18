import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const ClippingDB = new Mongo.Collection('clippingdb');
ClippingDB.cartaSet = 'clippingdb';

if (Meteor.isServer) {
  console.log('publish ClippingDB on server');
  Meteor.publish(ClippingDB.cartaSet, sessionID => ClippingDB.find({ sessionID }));
}
export default ClippingDB;

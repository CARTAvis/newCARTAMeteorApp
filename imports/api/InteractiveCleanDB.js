import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const InteractiveCleanDB = new Mongo.Collection('interactivecleandb');
InteractiveCleanDB.cartaSet = 'interactivecleandb';

if (Meteor.isServer) {
  console.log('publish InteractiveCleanDB on server');
  Meteor.publish(InteractiveCleanDB.cartaSet, sessionID => InteractiveCleanDB.find({ sessionID }));
}
export default InteractiveCleanDB;

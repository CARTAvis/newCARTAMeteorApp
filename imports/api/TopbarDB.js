import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const TopbarDB = new Mongo.Collection('topbardb');
TopbarDB.cartaSet = 'topbardb';

if (Meteor.isServer) {
  console.log('publish TopbarDB on server');
  Meteor.publish(TopbarDB.cartaSet, sessionID => TopbarDB.find({ sessionID }));
}
export default TopbarDB;

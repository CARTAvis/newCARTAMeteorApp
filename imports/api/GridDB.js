import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const GridDB = new Mongo.Collection('griddb');
GridDB.cartaSet = 'griddb';

if (Meteor.isServer) {
  console.log('publish gridDB on server');
  Meteor.publish(GridDB.cartaSet, sessionID => GridDB.find({ sessionID }));
}
export default GridDB;

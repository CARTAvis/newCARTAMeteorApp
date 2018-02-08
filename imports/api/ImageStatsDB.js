import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const ImageStatsDB = new Mongo.Collection('imagestatsdb');
ImageStatsDB.cartaSet = 'imagestatsdb';

if (Meteor.isServer) {
  console.log('publish regionDB on server');
  Meteor.publish(ImageStatsDB.cartaSet, sessionID => ImageStatsDB.find({ sessionID }));
}
export default ImageStatsDB;

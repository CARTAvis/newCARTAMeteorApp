import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const ImageSettingsDB = new Mongo.Collection('imagesettingsdb');
ImageSettingsDB.cartaSet = 'imagesettingsdb';

if (Meteor.isServer) {
  Meteor.publish(ImageSettingsDB.cartaSet, sessionID => ImageSettingsDB.find({ sessionID }));
}
export default ImageSettingsDB;

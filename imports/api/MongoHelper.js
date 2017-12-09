// @flow
import SessionManager from '../api/SessionManager';

let _dispatch = null;

export function storeReduxDispatch(dispatch) {
  // console.log('store redux dispatch for mongo');
  _dispatch = dispatch;
}

const actionCreator = (data, actionType) => ({
  type: actionType,
  payload: {
    data,
  },
});

export function setupMongoReduxListeners(collection, actionType) {
  collection.find().observe({
    added(newDoc) {
      _dispatch(actionCreator(newDoc, actionType));
    },
    changed(newDoc) {
      _dispatch(actionCreator(newDoc, actionType));
    },
  });
}

export function mongoResumeSelfDB(collection, actionType) {
  const sessionID = SessionManager.getSuitableSession();
  const docs = collection.find({ sessionID }).fetch();
  if (docs.length > 0) {
    const doc = docs[0];
    _dispatch(actionCreator(doc, actionType));
  }
}

export function mongoUpsert(collection: {}, newDocObject: {}, actionSubType: string) {
  newDocObject.actionSubType = actionSubType;
  const sessionID = SessionManager.getSuitableSession();
  const docs = collection.find({ sessionID }).fetch();
  if (docs.length > 0) {
    const doc = docs[0];
    const docID = doc._id;
    collection.update(docID, { $set: newDocObject });
  } else {
    newDocObject.sessionID = sessionID;
    collection.insert(newDocObject);
  }
}

import SessionManager from '../api/SessionManager';


// // NOTE: follow https://github.com/acdlite/flux-standard-action
// function receiveUIChange(data) {
//   return {
//     type: FILEBROWSER_CHANGE,
//     payload: {
//       data,
//     },
//   };
// }

// const genericActionCreator = (data) => {
//   return {
//     type: actionType,
//     payload:{
//       data,
//     },
//   };
// };

let _dispatch = null;

export function storeReduxDispatch(dispatch) {
  console.log('store redux dispatch for mongo');
  _dispatch = dispatch;
}

// TODO prevent same collection registering twice
export function setupMongoReduxListeners(collection, actionType) {
  const actionCreator = data => ({
    type: actionType,
    payload: {
      data,
    },
  });

  const collectionObservationHandle = collection.find().observe({
    added(newDoc) {
      _dispatch(actionCreator(newDoc));
    },
    changed(newDoc, oldDoc) {
      _dispatch(actionCreator(newDoc));
    },
    removed(oldDocument) {
      const documents = collection.find().fetch();
      if (documents.length > 0) {
        const doc = documents[0];
        // for watching the shared sessioni from python
        // which may manually remove images on client. special case
        if (!SessionManager.getOtherSession()) {
          _dispatch(actionCreator(doc));
        }
      }
    },
  });
}

export function mongoUpsert(collection, newDocObject, actionSubType) {
  newDocObject.actionSubType = actionSubType;
  const sessionID = SessionManager.getSuitableSession();
  console.log('sessionID: ', sessionID);
  const docs = collection.find({ sessionID }).fetch();
  console.log('DOCS LENGTH: ', docs.length);
  if (docs.length > 0) {
    console.log('update collection, action:', actionSubType);
    const doc = docs[0];
    const docID = doc._id;
    collection.update(docID, { $set: newDocObject });
  } else {
    console.log('insert collection, action:', actionSubType);
    newDocObject.sessionID = sessionID;
    // const docID =
    collection.insert(newDocObject);
  }
}

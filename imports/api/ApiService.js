// @flow
import { Meteor } from 'meteor/meteor';
import SessionManager from '../api/SessionManager';
import { mongoResumeSelfDB, setupMongoReduxListeners } from '../api/MongoHelper';
import { parseImageToMongo } from '../imageViewer/actions';

let instance = null;

export default class ApiService {
  waitSubDBlist: any[];
  dblist: any[];
  callbacks: any[];
  time: Date;
  constructor() {
    this.time = new Date();
    this.callbacks = [];
    this.dblist = [];
    this.waitSubDBlist = [];

    return instance;
  }

  static instance() {
    if (!instance) {
      instance = new ApiService();
    }

    return instance;
  }

  resumeselfDB() {
    for (const db of this.dblist) {
      mongoResumeSelfDB(db.collection, db.actionType);
    }
  }

  setupViewSize(viewName: string, width: number, height: number) {
    Meteor.call('setupViewSize', viewName, width, height, (error, result) => {
      console.log('get setupViewSize dummy result:', result);
    });
  }

  setupMongoRedux(collection: any, actionType: string) {
    const mongoSetName = collection.cartaSet;

    for (const db of this.dblist) {
      if (db.mongoSetName === mongoSetName) {
        // console.log('do not setup same mongo twice:', db.mongoSetName);
        return;
      }
    }

    setupMongoReduxListeners(collection, actionType);
    if (SessionManager.get()) {
      // console.log('directly setup subscribtioin:', mongoSetName);
      Meteor.subscribe(mongoSetName, SessionManager.get(), () => {
        // console.log(`${mongoSetName} subscribes OK: !!!`);
      });
    } else {
      this.waitSubDBlist.push({ mongoSetName, collection, actionType });
    }
    this.dblist.push({ mongoSetName, collection, actionType });
  }

  subscribeOtherPeopleDB() {
    for (const db of this.dblist) {
      db.handler = Meteor.subscribe(db.mongoSetName, SessionManager.getOtherSession(), () => {
        // console.log(`${db.mongoSetName} subscribe other people OK: !!!`);
      });
    }
  }

  unscribeOtherPeopleDB() {
    for (const db of this.dblist) {
      if (db.handler) {
        // console.log('stop other:', db.mongoSetName);
        db.handler.stop();
        db.handler = null;
      }
    }
  }

  subscribeAllDB() {
    for (const db of this.waitSubDBlist) {
      Meteor.subscribe(db.mongoSetName, SessionManager.get(), () => {
        // console.log(`${db.mongoSetName} subscribes OK: !!!`);
      });
    }

    this.waitSubDBlist.length = 0;
  }

  sendCommand(cmd: string, parameter: string, handler?: (resp: {}) => void) {
  // sendCommand(cmd: string, parameter: string, handler) {
    const id = cmd + parameter;

    const self = this;

    // https://stackoverflow.com/questions/45996511/new-missing-annotation-error-in-flowjs-0-54-0
    // https://stackoverflow.com/questions/43860791/type-promisevoid-is-not-assignable-to-type-promisecustomtype
    const p1:Promise<{}> = new Promise(
      ((resolve, reject) => {
        if (handler) {
          // console.log('send command with handler');
          self.callbacks.push({ id, callback: handler, resolve });
        } else {
          // console.log('send command without handler');
          self.callbacks.push({ id, callback: null, resolve });
        }
      }));

    Meteor.call('sendCommand', cmd, parameter, SessionManager.getSuitableSession(), (error, result) => {
      if (error) {
        console.log('get meteor command response err:', error);
      }

      console.log('send a command to meteor server ok:', result);
    });

    return p1;
  }

  // if this was typescript, "no type" anything still show no typescript error
  consumeResponse(resp: Object) {
    if (resp.pushedImage) {
      // console.log('get server pushed image):');
      parseImageToMongo(resp.buffer);

      return;
    }

    const target = resp.cmd + resp.parameter;
    let match = null;
    const len = this.callbacks.length;
    for (let i = 0; i < len; i++) {
      const obj = this.callbacks[i];
      if (obj.id === target) {
        match = obj;
        this.callbacks.splice(i, 1);

        break;
      }
    }

    // console.log('callback count:', this.callbacks.length);

    if (match) {
      // console.log('callback:', match.id);
      if (match.callback) {
        match.callback(resp);
      }

      if (match.resolve) {
        match.resolve(resp);
      }
    }
  }
}

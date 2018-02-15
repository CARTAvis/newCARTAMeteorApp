import api from '../api/ApiService';
import Commands from '../api/Commands';

import { InteractiveCleanDB } from '../api/InteractiveCleanDB';
import { mongoUpsert } from '../api/MongoHelper';

const INTERACTIVECLEAN_CHANGE = 'INTERACTIVECLEAN_CHANGE';

export const ActionType = {
  INTERACTIVECLEAN_CHANGE,
};

export function setupInteractiveCleanDB() {
  api.instance().setupMongoRedux(InteractiveCleanDB, INTERACTIVECLEAN_CHANGE);
}

function updateInteractiveClean() {
  return (dispatch, getState) => {
    const state = getState();
    const interactiveCleanID = state.InteractiveCleanDB.interactiveCleanID;

    const cmd = `${interactiveCleanID}:getInteractiveClean`;
    const arg = '';

    api.instance().sendCommand(cmd, arg)
      .then((resp) => {
        console.log('ic:resp:', resp.data);
      });
  };
}

function setupInteractiveClean() {
  return () => {
    const cmd = Commands.REGISTER_VIEWER;
    const arg = 'pluginId:InteractiveClean,index:0';

    api.instance().sendCommand(cmd, arg)
      .then((resp) => {
        parseRegisterInteractiveClean(resp);
      });
  };
}

function sendCleanCommand(command) {
  return (dispatch, getState) => {
    const state = getState();
    const interactiveCleanID = state.InteractiveCleanDB.interactiveCleanID;

    const cmd = `${interactiveCleanID}:cleanCommand`;
    const arg = command;

    api.instance().sendCommand(cmd, arg)
      .then((resp) => {
        console.log('ic:resp:', resp.data);
      });
  };
}

function sendMaskCommand(command) {
  return (dispatch, getState) => {
    const state = getState();
    const interactiveCleanID = state.InteractiveCleanDB.interactiveCleanID;

    const cmd = `${interactiveCleanID}:maskCommand`;
    const arg = command;

    api.instance().sendCommand(cmd, arg)
      .then((resp) => {
        console.log('ic:resp:', resp.data);
      });
  };
}

function parseRegisterInteractiveClean(resp) {
  const { cmd, data } = resp;
  const interactiveCleanID = data;

  mongoUpsert(InteractiveCleanDB, { interactiveCleanID }, `Resp_${cmd}`);
}

const actions = {
  updateInteractiveClean,
  setupInteractiveClean,
  sendCleanCommand,
  sendMaskCommand,
};

export default actions;

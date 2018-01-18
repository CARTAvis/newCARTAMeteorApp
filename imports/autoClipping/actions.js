import api from '../api/ApiService';
import Commands from '../api/Commands';
import { AutoClippingDB } from '../api/AutoClippingDB';
import { mongoUpsert } from '../api/MongoHelper';

const AUTO_CLIP_CHANGE = 'AUTO_CLIP_CHANGE';

export const ActionType = {
  AUTO_CLIP_CHANGE,
};

export function setupAutoClippingDB() {
  api.instance().setupMongoRedux(AutoClippingDB, AUTO_CLIP_CHANGE);
}

function updateAutoClipping(autoClip) {
  return (dispatch, getState) => {
    // percentile setting belongs to controllerID (controller object) in backend site
    const controllerID = getState().ImageViewerDB.controllerID;
    const cmd = `${controllerID}:${Commands.SET_AUTO_CLIP_VALUE}`;
    const arg = `${Commands.AUTO_CLIP_KEY}:${autoClip}`;

    api.instance().sendCommand(cmd, arg)
      .then((resp) => {
        // mongoUpsert(AutoClippingDB, { autoClip }, `Resp_${cmd}`);
      });
  };
}

function parseReigsterColormap(resp) {
  const { cmd, data } = resp;
  const autoClip = data;
  mongoUpsert(AutoClippingDB, { autoClip }, `Resp_${cmd}`);
}

function getAutoClipState() {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const cmd = `${controllerID}:${Commands.GET_AUTO_CLIP_STATE}`;
    const arg = '';

    api.instance().sendCommand(cmd, arg)
      .then((resp) => {
        parseReigsterColormap(resp);
      });
  };
}

function setupAutoClipping(autoClip) {
  return () => {
    const cmd = Commands.REGISTER_VIEWER;
    mongoUpsert(AutoClippingDB, { autoClip }, `Resp_${cmd}`);
  };
}

const actions = {
  updateAutoClipping,
  setupAutoClipping,
  getAutoClipState,
};

export default actions;

import api from '../api/ApiService';
import Commands from '../api/Commands';
import { ClippingDB } from '../api/ClippingDB';
import { mongoUpsert } from '../api/MongoHelper';

const CLIP_CHANGE = 'CLIP_CHANGE';

export const ActionType = {
  CLIP_CHANGE,
};

export function setupClippingDB() {
  api.instance().setupMongoRedux(ClippingDB, CLIP_CHANGE);
}

function updateClipping(percentile) {
  return (dispatch, getState) => {
    // percentile setting belongs to controllerID (controller object) in backend site
    const controllerID = getState().ImageViewerDB.controllerID;
    const cmd = `${controllerID}:${Commands.SET_CLIP_VALUE}`;
    const arg = `${Commands.CLIP_KEY}:${percentile}`;

    api.instance().sendCommand(cmd, arg)
      .then((resp) => {
        // mongoUpsert(ClippingDB, { percentile }, `Resp_${cmd}`);
      });
  };
}

function parseReigsterClipping(resp) {
  const { cmd, data } = resp;
  const percentile = data;
  mongoUpsert(ClippingDB, { percentile }, `Resp_${cmd}`);
}

function getClipState() {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const cmd = `${controllerID}:${Commands.GET_CLIP_STATE}`;
    const arg = '';

    api.instance().sendCommand(cmd, arg)
      .then((resp) => {
        parseReigsterClipping(resp);
      });
  };
}

function setupClipping(percentile) {
  return () => {
    const cmd = Commands.REGISTER_VIEWER;
    mongoUpsert(ClippingDB, { percentile }, `Resp_${cmd}`);
  };
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

function parseReigsterAutoClipping(resp) {
  const { cmd, data } = resp;
  const autoClip = data;
  mongoUpsert(ClippingDB, { autoClip }, `Resp_${cmd}`);
}

function getAutoClipState() {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const cmd = `${controllerID}:${Commands.GET_AUTO_CLIP_STATE}`;
    const arg = '';

    api.instance().sendCommand(cmd, arg)
      .then((resp) => {
        parseReigsterAutoClipping(resp);
      });
  };
}

function setupAutoClipping(autoClip) {
  return () => {
    const cmd = Commands.REGISTER_VIEWER;
    mongoUpsert(ClippingDB, { autoClip }, `Resp_${cmd}`);
  };
}

const actions = {
  updateClipping,
  setupClipping,
  getClipState,
  updateAutoClipping,
  setupAutoClipping,
  getAutoClipState,
};

export default actions;

import { HistogramSettingsDB } from '../api/HistogramSettingsDB';
import { HistogramDB } from '../api/HistogramDB';
import api from '../api/ApiService';
import { mongoUpsert } from '../api/MongoHelper';
import Commands from '../api/Commands';
import HistogramActions from '../histogram/actions';

const HISTOGRAM_SETTINGS_CHANGE = 'HISTOGRAM_SETTINGS_CHANGE';
const GET_HISTOGRAM_PREF = 'GET_HISTOGRAM_PREF';
const SET_HISTOGRAM_DISPLAY = 'SET_HISTOGRAM_DISPLAY';
const SET_MAIN_SETTING = 'SET_MAIN_SETTING';
export const ActionType = {
  HISTOGRAM_SETTINGS_CHANGE,
};

export function setupHistogramSettingsDB() {
  api.instance().setupMongoRedux(HistogramSettingsDB, HISTOGRAM_SETTINGS_CHANGE);
}
function getHistogramPref() {
  return (dispatch, getState) => {
    const histogramID = getState().HistogramDB.histogramID;
    const cmd = `${histogramID}:${Commands.GET_HISTOGRAM_PREF}`;
    api.instance().sendCommand(cmd, '', (resp) => {
      console.log('PREF DATA: ', resp.data);
      const dataObj = JSON.parse(resp.data.preferences);
      mongoUpsert(HistogramSettingsDB, { histogramSettings: dataObj }, GET_HISTOGRAM_PREF);
    });
  };
}
function setBinCount(count) {
  return (dispatch, getState) => {
    const histogramID = getState().HistogramDB.histogramID;
    const cmd = `${histogramID}:${Commands.SET_BIN_COUNT}`;
    const arg = `binCount:${count}`;
    api.instance().sendCommand(cmd, arg)
      .then(() => {
        dispatch(getHistogramPref());
        dispatch(HistogramActions.getHistogramData());
      });
  };
}
function setBinWidth(width) {
  return (dispatch, getState) => {
    const histogramID = getState().HistogramDB.histogramID;
    const cmd = `${histogramID}:${Commands.SET_BIN_WIDTH}`;
    const arg = `binWidth:${width}`;
    api.instance().sendCommand(cmd, arg)
      .then(() => {
        dispatch(getHistogramPref());
        dispatch(HistogramActions.getHistogramData());
      });
  };
}
function setDisplayType(type) {
  return () => {
    mongoUpsert(HistogramDB, { displayType: type }, SET_HISTOGRAM_DISPLAY);
  };
}
function setLogCount(value) {
  return (dispatch, getState) => {
    const histogramID = getState().HistogramDB.histogramID;
    const cmd = `${histogramID}:${Commands.SET_LOG_COUNT}`;
    const arg = `logCount:${value}`;
    api.instance().sendCommand(cmd, arg)
      .then(() => {
        dispatch(getHistogramPref());
      });
  };
}
function setHistogramMainSetting(settingCategory) {
  return () => {
    mongoUpsert(HistogramSettingsDB, { histogramMainSetting: settingCategory }, SET_MAIN_SETTING);
  };
}
function setPlaneMode(mode) {
  return (dispatch, getState) => {
    const histogramID = getState().HistogramDB.histogramID;
    const cmd = `${histogramID}:${Commands.SET_PLANE_MODE}`;
    const arg = `planeMode:${mode}`;
    api.instance().sendCommand(cmd, arg)
      .then(() => {
        dispatch(getHistogramPref());
        dispatch(HistogramActions.getHistogramData());
      });
  };
}
function setPlaneChannel(channel) {
  return (dispatch, getState) => {
    const histogramID = getState().HistogramDB.histogramID;
    const cmd = `${histogramID}:${Commands.SET_PLANE_CHANNEL}`;
    const arg = `planeChannel:${channel}`;
    api.instance().sendCommand(cmd, arg)
      .then(() => {
        dispatch(HistogramActions.getHistogramData());
      });
  };
}
const actions = {
  setBinCount,
  getHistogramPref,
  setBinWidth,
  setDisplayType,
  setLogCount,
  setHistogramMainSetting,
  setPlaneMode,
  setPlaneChannel,
};
export default actions;

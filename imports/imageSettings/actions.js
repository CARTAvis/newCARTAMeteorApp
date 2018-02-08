import { ImageSettingsDB } from '../api/ImageSettingsDB';
import Commands from '../api/Commands';
import { mongoUpsert } from '../api/MongoHelper';
import api from '../api/ApiService';

const IMAGE_SETTINGS_CHANGE = 'IMAGE_SETTINGS_CHANGE';
const SET_MAIN_IMAGE_SETTING = 'SET_MAIN_IMAGE_SETTING';
const SET_SUB_IMAGE_SETTING = 'SET_SUB_IMAGE_SETTING';

export const ActionType = {
  IMAGE_SETTINGS_CHANGE,
};

export function setupImageSettingsDB() {
  api.instance().setupMongoRedux(ImageSettingsDB, IMAGE_SETTINGS_CHANGE);
}
function setMainSetting(setting) {
  return () => {
    mongoUpsert(ImageSettingsDB, { mainSetting: setting }, SET_MAIN_IMAGE_SETTING);
  };
}
function setSubSetting(subSetting) {
  return () => {
    mongoUpsert(ImageSettingsDB, { subSetting }, SET_SUB_IMAGE_SETTING);
  };
}
const actions = {
  setMainSetting,
  setSubSetting,
};

export default actions;

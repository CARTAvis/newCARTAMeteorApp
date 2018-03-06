// import { Meteor } from 'meteor/meteor';
import { mongoUpsert } from '../api/MongoHelper';
// import SessionManager from '../api/SessionManager';
import { SettingsDB } from '../api/SettingsDB';
import api from '../api/ApiService';


const SETTINGS_CHANGE = 'SETTINGS_CHANGE';
const ADD_NEW_SETTING = 'ADD_NEW_SETTING';
const REMOVE_SETTING = 'REMOVE_SETTING';
export const ActionType = {
  SETTINGS_CHANGE,
};

export function setupSettingsDB() {
  api.instance().setupMongoRedux(SettingsDB, SETTINGS_CHANGE);
}

function setSetting(settingType) {
  return (dispatch, getState) => {
    const settingsArray = getState().SettingsDB.settingsArray;
    let found = false;
    for (let i = 0; i < settingsArray.length; i += 1) {
      if (settingsArray[i].settingType === settingType) {
        found = true;
        break;
      }
    }
    if (!found) {
      let show = getState().SettingsDB.show;
      if (settingsArray.length === 0) {
        show = true;
      }
      mongoUpsert(SettingsDB, {
        settingsArray: settingsArray.concat({
          settingType,
          // setting: settingObj,
          key: Math.floor(Math.random() * 100),
        }),
        currentSetting: settingType,
        show,
      }, ADD_NEW_SETTING);
    }
  };
}
function settingChanged(newSetting) {
  return () => {
    mongoUpsert(SettingsDB, { currentSetting: newSetting }, SETTINGS_CHANGE);
  };
}
function clearAll() {
  return () => {
    mongoUpsert(SettingsDB, { settingsArray: [], currentSetting: '', show: false }, REMOVE_SETTING);
  };
}
function removeSetting(settingType) {
  return (dispatch, getState) => {
    const settingsArray = getState().SettingsDB.settingsArray;
    if (settingsArray.length === 1) {
      dispatch(clearAll());
    } else if (settingsArray.length > 1) {
      let index = 0;
      for (let i = 0; i < settingsArray.length; i += 1) {
        if (settingsArray[i].settingType === settingType) {
          if (i === settingsArray.length - 1) index = i - 1;
          else index = i + 1;
        }
      }
      mongoUpsert(SettingsDB, {
        settingsArray: settingsArray.filter(item => item.settingType !== settingType),
        currentSetting: settingsArray[index].settingType,
      }, REMOVE_SETTING);
    }
  };
}
const actions = {
  setSetting,
  settingChanged,
  removeSetting,
  clearAll,
};
export default actions;

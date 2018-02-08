// import { combineReducers } from 'redux';
import { ActionType } from './actions';

// const defaultData = {
//   // rootDir: '/tmp',
//   // files: [{ name: 'apple.fits', type: 'fits' }],
// };
const defaultState = { settingsArray: [], currentSetting: '', show: false };

const SettingsDB = (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.SETTINGS_CHANGE: {
      // console.log('histogramDB action:', action);
      return action.payload.data;
    }
    case 'RESET_REDUX_STATE':
      return defaultState;
    default:
      return state;
  }
};

const settingsReducer = {
  SettingsDB,
};

export default settingsReducer;

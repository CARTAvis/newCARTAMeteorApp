import { ActionType } from './actions';

const defaultState = {};
const StatsSettingsDB = (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.STATS_SETTINGS_CHANGE: {
      // console.log('region action:', action);
      return action.payload.data;
    }
    case 'RESET_REDUX_STATE':
      return defaultState;
    default:
      return state;
  }
};

const statsSettingsReducer = {
  StatsSettingsDB,
};

export default statsSettingsReducer;

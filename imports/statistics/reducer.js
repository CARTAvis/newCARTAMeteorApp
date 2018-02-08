import { ActionType } from './actions';

const defaultState = {};
const StatsDB = (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.STATISTICS_CHANGE: {
      // console.log('region action:', action);
      return action.payload.data;
    }
    case 'RESET_REDUX_STATE':
      return defaultState;
    default:
      return state;
  }
};

const statsReducer = {
  StatsDB,
};

export default statsReducer;

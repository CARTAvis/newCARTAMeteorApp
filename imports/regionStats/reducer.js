import { ActionType } from './actions';

const defaultState = { regionStats: [{}] };
const RegionStatsDB = (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.REGION_STATS_CHANGE: {
      // console.log('region action:', action);
      return action.payload.data;
    }
    case 'RESET_REDUX_STATE':
      return defaultState;
    default:
      return state;
  }
};

const regionStatsReducer = {
  RegionStatsDB,
};

export default regionStatsReducer;

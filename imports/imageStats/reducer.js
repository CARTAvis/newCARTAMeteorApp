import { ActionType } from './actions';

const defaultState = { selectedIndex: 0, imageStats: [{}] };
const ImageStatsDB = (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.IMAGE_STATS_CHANGE: {
      // console.log('region action:', action);
      return action.payload.data;
    }
    case 'RESET_REDUX_STATE':
      return defaultState;
    default:
      return state;
  }
};

const imageStatsReducer = {
  ImageStatsDB,
};

export default imageStatsReducer;

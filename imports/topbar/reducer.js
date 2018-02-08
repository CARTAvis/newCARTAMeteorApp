import { ActionType } from './actions';

const defaultState = {};
const TopbarDB = (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.TOPBAR_CHANGE: {
      // console.log('region action:', action);
      return action.payload.data;
    }
    case 'RESET_REDUX_STATE':
      return defaultState;
    default:
      return state;
  }
};

const topbarReducer = {
  TopbarDB,
};

export default topbarReducer;

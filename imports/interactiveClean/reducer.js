import { ActionType } from './actions';

const defaultState = {
};
const InteractiveCleanDB = (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.INTERACTIVECLEAN_CHANGE: {
      return action.payload.data;
    }
    case 'RESET_REDUX_STATE':
      return defaultState;
    default:
      return state;
  }
};

const interactiveCleanReducer = {
  InteractiveCleanDB,
};

export default interactiveCleanReducer;

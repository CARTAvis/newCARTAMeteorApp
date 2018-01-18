import { ActionType } from './actions';

const defaultState = {
  autoClip: false,
};

const AutoClippingDB = (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.AUTO_CLIP_CHANGE: {
      console.log('ActionType.AUTO_CLIP_CHANGE');
      return action.payload.data;
    }
    case 'RESET_REDUX_STATE':
      return defaultState;
    default:
      return state;
  }
};

const autoClippingReducer = {
  AutoClippingDB,
};

export default autoClippingReducer;

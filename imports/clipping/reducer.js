import { ActionType } from './actions';

const defaultState = {
  percentile: 1.0,
  autoClip: false,
};

const ClippingDB = (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.CLIP_CHANGE: {
      console.log('ActionType.CLIP_CHANGE');
      return action.payload.data;
    }
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

const clippingReducer = {
  ClippingDB,
};

export default clippingReducer;

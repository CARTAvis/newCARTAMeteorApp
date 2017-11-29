// @flow
// import { combineReducers } from 'redux';
import type { Action } from '../shared/action.models';

// const defaultData = {
//   // rootDir: '/tmp',
//   // files: [{ name: 'apple.fits', type: 'fits' }],
// };
const defaultState = { data: {} };

const HistogramDB = (state: {data: any} = defaultState, action: Action) => {
  switch (action.type) {
    case 'HISTOGRAM_CHANGE': {
      // console.log('histogramDB action:', action);
      return action.payload.data;
    }
    case 'RESET_REDUX_STATE':
      return defaultState;
    default:
      return state;
  }
};

const histogramReducer = {
  HistogramDB,
};

export default histogramReducer;

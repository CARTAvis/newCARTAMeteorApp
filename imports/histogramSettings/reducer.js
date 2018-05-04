import { ActionType } from './actions';

const defaultState = { binWidth: 0, binCount: 0, displayType: 'bar' };

const HistogramSettingsDB = (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.HISTOGRAM_SETTINGS_CHANGE: {
      // console.log('histogramDB action:', action);
      return action.payload.data;
    }
    case 'RESET_REDUX_STATE':
      return defaultState;
    default:
      return state;
  }
};

const histogramSettingsReducer = {
  HistogramSettingsDB,
};

export default histogramSettingsReducer;

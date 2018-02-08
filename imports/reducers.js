import { combineReducers } from 'redux';

import fileReducer from './fileBrowser/reducer';
import imageReducer from './imageViewer/reducer';
import regionReducer from './region/reducer';
import sessionReducer from './app/reducer';
import profilerReducer from './profiler/reducer';
import histogramReducer from './histogram/reducer';
import featureReducer from './featureContainer/reducer';
import animatorReducer from './animator/reducer';
import colormapReducer from './colormap/reducer';
import gridControlReducer from './gridControl/reducer';
import topbarReducer from './topbar/reducer';
import statsReducer from './statistics/reducer';
import statsSettingsReducer from './statsSettings/reducer';
import settingsReducer from './settings/reducer';
import imageSettingsReducer from './imageSettings/reducer';
import imageStatsReducer from './imageStats/reducer';
import regionStatsReducer from './regionStats/reducer';

const rootReducer = combineReducers({
  ...sessionReducer,
  ...fileReducer,
  ...imageReducer,
  ...regionReducer,
  ...histogramReducer,
  ...profilerReducer,
  ...featureReducer,
  ...animatorReducer,
  ...colormapReducer,
  ...gridControlReducer,
  ...topbarReducer,
  ...statsReducer,
  ...statsSettingsReducer,
  ...settingsReducer,
  ...imageSettingsReducer,
  ...imageStatsReducer,
  ...regionStatsReducer,
});

export default rootReducer;

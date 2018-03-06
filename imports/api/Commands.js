// !!continue to use these previous commands which is used by old CARTA. !!
// global-like
const REGISTER_VIEWER = '/CartaObjects/ViewManager:registerView';
const REQUEST_FILE_LIST = '/CartaObjects/DataLoader:getData';
const SELECT_FILE_TO_OPEN = '/CartaObjects/ViewManager:dataLoaded';
// const GET_COLORMAPS = '/CartaObjects/Colormaps:getColormaps';
// non-global, need object id

// non-global
// need object id
const GET_ANIMATORTYPE_ID = 'registerAnimator';
const SET_ZOOM_LEVEL = 'setZoomLevel';
const CLOSE_IMAGE = 'closeImage';
const SET_FRAME = 'setFrame';
const SET_COLORMAP = 'setColormap';
const SET_STATS_VISIBLE = 'setStatVisible';
const SET_BIN_COUNT = 'setBinCount';
const SET_BIN_WIDTH = 'setBinWidth';
const SET_LOG_COUNT = 'setLogCount';
const SET_SIG_DIGITS = 'setSignificantDigits';
// New commands for new CARTA:
// const GET_DEFAULT_HISTOGRAM_ID = '/CartaObjects/ViewManager:getDefaultHistogramID';
const QUERY_ANIMATOR_TYPES = 'queryAnimatorTypes';
const GET_SELECTION_DATA = 'getSelecitonData';
const NEW_ZOOM = 'newzoom';
const GET_STACK_DATA = 'getStackData';
const PAN_ZOOM = 'zoom';
const PAN_RESET = 'resetPan';
const INPUT_EVENT = 'inputEvent';
const SET_REGION_TYPE = 'setRegionType';
const REGISTER_REGION_CONTROLS = 'registerRegionControls';
const REGISTER_GRID_CONTROLS = 'registerGridControls';
const CLOSE_REGION = 'closeRegion';
const GET_COLORMAP_All_DATA = 'get_colormap_all_data';
const REGION_ZOOM = 'regionZoom';
const GET_COLORMAPS = 'getColormaps';
const GET_STATS_INFO = 'getStatsInfo';
const GET_STATS_PREF = 'getStatsPref';
const GET_HISTOGRAM_PREF = 'getHistogramPref';
// TODO some commands need parameters, wrap them as a function

const Commands = {
  REGISTER_VIEWER,
  REQUEST_FILE_LIST,
  SELECT_FILE_TO_OPEN,
  QUERY_ANIMATOR_TYPES,
  GET_ANIMATORTYPE_ID,
  GET_SELECTION_DATA,
  NEW_ZOOM,
  SET_ZOOM_LEVEL,
  SET_FRAME,
  GET_STACK_DATA,
  CLOSE_IMAGE,
  PAN_ZOOM,
  PAN_RESET,
  INPUT_EVENT,
  SET_REGION_TYPE,
  REGISTER_REGION_CONTROLS,
  REGISTER_GRID_CONTROLS,
  CLOSE_REGION,
  GET_COLORMAP_All_DATA,
  REGION_ZOOM,
  GET_COLORMAPS,
  SET_COLORMAP,
  GET_STATS_INFO,
  GET_STATS_PREF,
  SET_STATS_VISIBLE,
  SET_BIN_COUNT,
  GET_HISTOGRAM_PREF,
  SET_BIN_WIDTH,
  SET_LOG_COUNT,
  SET_SIG_DIGITS,
  // GET_DEFAULT_HISTOGRAM_ID,
};

export default Commands;

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
const SET_SHOW_COORDINATE_SYSTEM = 'setShowCoordinateSystem'; // commands for grid control
const SET_COORDINATE_SYSTEM = 'setCoordinateSystem';
const SET_SHOW_GRID_LINES = 'setShowGridLines';
const SET_GRID_THICKNESS = 'setGridThickness';
const SET_GRID_SPACING = 'setGridSpacing';
const SET_GRID_TRANSPARENCY = 'setGridTransparency';
const SET_AXES_THICKNESS = 'setAxesThickness';
const SET_AXES_TRANSPARENCY = 'setAxesTransparency';
const SET_SHOW_AXIS = 'setShowAxis';
const SET_SHOW_INTERNAL_LABELS = 'setShowInternalLabels';
const SET_AXIS_X = 'setAxisX';
const SET_AXIS_Y = 'setAxisY';
const SET_FONT_FAMILY = 'setFontFamily';
const SET_FONT_SIZE = 'setFontSize';
const SET_LABEL_DECIMALS = 'setLabelDecimals';
const SET_SHOW_TICKS = 'setShowTicks';
const SET_TICK_LENGTH = 'setTickLength';
const SET_TICK_TRANSPARENCY = 'setTickTransparency';
const SET_TICK_THICKNESS = 'setTickThickness';
const SET_GRID_LABEL_FORMAT = 'setGridLabelFormat';

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
const CLOSE_REGION = 'closeRegion';
const GET_COLORMAP_ALL_DATA = 'getColormapAllData';
const REGION_ZOOM = 'regionZoom';
const GET_COLORMAPS = 'getColormaps';
const GET_STATS_INFO = 'getStatsInfo';
const GET_STATS_PREF = 'getStatsPref';
const GET_DATA_GRID_STATE = 'getDataGridState'; // commands for grid control
const SET_SHOW_DEFAULT_COORDINATE_SYSTEM = 'setShowDefaultCoordinateSystem';
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
  CLOSE_REGION,
  GET_COLORMAP_ALL_DATA,
  REGION_ZOOM,
  GET_COLORMAPS,
  SET_COLORMAP,
  GET_STATS_INFO,
  GET_STATS_PREF,
  SET_STATS_VISIBLE,
  GET_DATA_GRID_STATE, // commands of grid control
  SET_SHOW_COORDINATE_SYSTEM,
  SET_SHOW_DEFAULT_COORDINATE_SYSTEM,
  SET_COORDINATE_SYSTEM,
  SET_SHOW_GRID_LINES,
  SET_GRID_THICKNESS,
  SET_GRID_SPACING,
  SET_GRID_TRANSPARENCY,
  SET_AXES_THICKNESS,
  SET_AXES_TRANSPARENCY,
  SET_SHOW_AXIS,
  SET_SHOW_INTERNAL_LABELS,
  SET_AXIS_X,
  SET_AXIS_Y,
  SET_FONT_FAMILY,
  SET_FONT_SIZE,
  SET_LABEL_DECIMALS,
  SET_SHOW_TICKS,
  SET_TICK_LENGTH,
  SET_TICK_TRANSPARENCY,
  SET_TICK_THICKNESS,
  SET_GRID_LABEL_FORMAT,
  SET_BIN_COUNT,
  GET_HISTOGRAM_PREF,
  SET_BIN_WIDTH,
  SET_LOG_COUNT,
  SET_SIG_DIGITS,
  // GET_DEFAULT_HISTOGRAM_ID,
};

export default Commands;

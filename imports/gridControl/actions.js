// import { Meteor } from 'meteor/meteor';
import { mongoUpsert } from '../api/MongoHelper';
// import SessionManager from '../api/SessionManager';
import { ImageViewerDB } from '../api/ImageViewerDB';
import { GridDB } from '../api/GridDB';
import Commands from '../api/Commands';
import api from '../api/ApiService';

// redux part
const DATAGRID_CHANGE = 'DATAGRID_CHANGE';
export const ActionType = {
  DATAGRID_CHANGE,
};

export function setupGridDB() {
  api.instance().setupMongoRedux(GridDB, DATAGRID_CHANGE);
}

function getDataGrid() {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    // console.log('Verify getting gridControlID successfully:', gridControlID);
    const command = `${controllerID}:${Commands.GET_DATA_GRID_STATE}`;
    api.instance().sendCommand(command, '')
      .then((response) => {
        console.log('Test to get datagridstate', response);
        const { data } = response;
        console.log('The spread data', data);
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setDataGrid(cmd, value) {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    const command = `${controllerID}:${cmd}`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        console.log(`Test to set DataGrid: ${command}:${value}`);
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setShowCoordinateSystem(value) {
  return (dispatch) => {
    dispatch(setDataGrid(Commands.SET_SHOW_COORDINATE_SYSTEM, value));
  };
}

function setShowDefaultCoordinateSystem(value) {
  return (dispatch) => {
    dispatch(setDataGrid(Commands.SET_SHOW_DEFAULT_COORDINATE_SYSTEM, value));
  };
}

function setCoordinateSystem(name) {
  return (dispatch, getState) => {
    const oldName = getState().GridDB.DataGrid.skyCS;
    if (oldName !== name) {
      dispatch(setDataGrid(Commands.SET_COORDINATE_SYSTEM, name));
    }
  };
}

function setShowGridLines(value) {
  return (dispatch) => {
    dispatch(setDataGrid(Commands.SET_SHOW_GRID_LINES, value));
  };
}

function setGridThickness(value) {
  return (dispatch, getState) => {
    const oldValue = getState().GridDB.DataGrid.grid.width;
    if (oldValue !== value) {
      dispatch(setDataGrid(Commands.SET_GRID_THICKNESS, value));
    }
  };
}

function setGridSpacing(value) {
  return (dispatch, getState) => {
    // Javascipt number is not precise, get fixed decimals to send command
    // so that the response can find the target callback.
    value = value.toFixed(2);
    const oldValue = getState().GridDB.DataGrid.spacing;
    if (oldValue !== value) {
      dispatch(setDataGrid(Commands.SET_GRID_SPACING, value));
    }
  };
}

function setGridTransparency(value) {
  return (dispatch, getState) => {
    const oldValue = getState().GridDB.DataGrid.grid.alpha;
    if (oldValue !== value) {
      dispatch(setDataGrid(Commands.SET_GRID_TRANSPARENCY, value));
    }
  };
}

function setAxesThickness(value) {
  return (dispatch, getState) => {
    const oldValue = getState().GridDB.DataGrid.axes.width;
    if (oldValue !== value) {
      dispatch(setDataGrid(Commands.SET_AXES_THICKNESS, value));
    }
  };
}

function setAxesTransparency(value) {
  return (dispatch, getState) => {
    const oldValue = getState().GridDB.DataGrid.axes.alpha;
    if (oldValue !== value) {
      dispatch(setDataGrid(Commands.SET_AXES_TRANSPARENCY, value));
    }
  };
}

function setShowAxis(value) {
  return (dispatch) => {
    dispatch(setDataGrid(Commands.SET_SHOW_AXIS, value));
  };
}

function setShowInternalLabels(value) {
  return (dispatch) => {
    dispatch(setDataGrid(Commands.SET_SHOW_INTERNAL_LABELS, value));
  };
}

function setAxisX(name) {
  return (dispatch, getState) => {
    const oldName = getState().GridDB.DataGrid.xAxis;
    if (oldName !== name) {
      dispatch(setDataGrid(Commands.SET_AXIS_X, name));
    }
  };
}

function setAxisY(name) {
  return (dispatch, getState) => {
    const oldName = getState().GridDB.DataGrid.yAxis;
    if (oldName !== name) {
      dispatch(setDataGrid(Commands.SET_AXIS_Y, name));
    }
  };
}

function setFontFamily(value) {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    const command = `${controllerID}:${Commands.SET_FONT_FAMILY}`;
    // console.log('+++++++++++++++++++++++++++++++ The command value of setFontFamily', value);
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setFontSize(value) {
  return (dispatch, getState) => {
    const oldValue = getState().GridDB.DataGrid.font.size;
    if (oldValue !== value) {
      dispatch(setDataGrid(Commands.SET_FONT_SIZE, value));
    }
  };
}

function setLabelDecimals(value) {
  return (dispatch, getState) => {
    const oldValue = getState().GridDB.DataGrid.decimals;
    if (oldValue !== value) {
      dispatch(setDataGrid(Commands.SET_LABEL_DECIMALS, value));
    }
  };
}

function setShowTicks(value) {
  return (dispatch) => {
    dispatch(setDataGrid(Commands.SET_SHOW_TICKS, value));
  };
}

function setTickLength(value) {
  return (dispatch, getState) => {
    const oldValue = getState().GridDB.DataGrid.tickLength;
    if (oldValue !== value) {
      dispatch(setDataGrid(Commands.SET_TICK_LENGTH, value));
    }
  };
}

function setTickTransparency(value) {
  return (dispatch, getState) => {
    const oldValue = getState().GridDB.DataGrid.tick.alpha;
    if (oldValue !== value) {
      dispatch(setDataGrid(Commands.SET_TICK_TRANSPARENCY, value));
    }
  };
}

function setTickThickness(value) {
  return (dispatch, getState) => {
    const oldValue = getState().GridDB.DataGrid.tick.width;
    if (oldValue !== value) {
      dispatch(setDataGrid(Commands.SET_TICK_THICKNESS, value));
    }
  };
}

function setGridLabelFormat(format, side) {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    const command = `${controllerID}:${Commands.SET_GRID_LABEL_FORMAT}`;
    const arg = `format:${format.replace(/:/g, '-')},side:${side}`;
    api.instance().sendCommand(command, arg)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

const actions = {
  getDataGrid,
  setShowCoordinateSystem,
  setShowDefaultCoordinateSystem,
  setCoordinateSystem,
  setShowGridLines,
  setGridThickness,
  setGridSpacing,
  setGridTransparency,
  setAxesThickness,
  setAxesTransparency,
  setShowAxis,
  setShowInternalLabels,
  setAxisX,
  setAxisY,
  setFontFamily,
  setFontSize,
  setLabelDecimals,
  setShowTicks,
  setTickLength,
  setTickTransparency,
  setTickThickness,
  setGridLabelFormat,
};

export default actions;

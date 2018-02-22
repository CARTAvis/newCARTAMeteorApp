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

function setShowCoordinateSystem(value) {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    const command = `${controllerID}:${Commands.SET_SHOW_COORDINATE_SYSTEM}`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setShowDefaultCoordinateSystem(value) {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    const command = `${controllerID}:${Commands.SET_SHOW_DEFAULT_COORDINATE_SYSTEM}`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setCoordinateSystem(name) {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    const command = `${controllerID}:${Commands.SET_COORDINATE_SYSTEM}`;
    api.instance().sendCommand(command, name)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setShowGridLines(value) {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    const command = `${controllerID}:${Commands.SET_SHOW_GRID_LINES}`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setGridThickness(value) {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    const command = `${controllerID}:${Commands.SET_GRID_THICKNESS}`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setGridSpacing(value) {
  return (dispatch, getState) => {
    // Javascipt number is not precise, get fixed decimals to send command
    // so that the response can find the target callback.
    value = value.toFixed(2);
    const { controllerID } = getState().ImageViewerDB;
    const command = `${controllerID}:${Commands.SET_GRID_SPACING}`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setGridTransparency(value) {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    const command = `${controllerID}:${Commands.SET_GRID_TRANSPARENCY}`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setAxesThickness(value) {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    const command = `${controllerID}:${Commands.SET_AXES_THICKNESS}`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setAxesTransparency(value) {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    const command = `${controllerID}:${Commands.SET_AXES_TRANSPARENCY}`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setShowAxis(value) {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    const command = `${controllerID}:${Commands.SET_SHOW_AXIS}`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setShowInternalLabels(value) {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    const command = `${controllerID}:${Commands.SET_SHOW_INTERNAL_LABELS}`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setAxisX(name) {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    const oldName = getState().GridDB.DataGrid.xAxis;
    if (oldName !== name) {
      const command = `${controllerID}:${Commands.SET_AXIS_X}`;
      api.instance().sendCommand(command, name)
        .then((response) => {
          // const { xAxis, yAxis } = response;
          // console.log('Test to get response', response);
          const { data } = response;
          mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
        });
    }
  };
}

function setAxisY(name) {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    const oldName = getState().GridDB.DataGrid.yAxis;
    if (oldName !== name) {
      const command = `${controllerID}:${Commands.SET_AXIS_Y}`;
      api.instance().sendCommand(command, name)
        .then((response) => {
          const { data } = response;
          mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
        });
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
    const { controllerID } = getState().ImageViewerDB;
    const command = `${controllerID}:${Commands.SET_FONT_SIZE}`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setLabelDecimals(value) {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    const command = `${controllerID}:${Commands.SET_LABEL_DECIMALS}`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setShowTicks(value) {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    const command = `${controllerID}:${Commands.SET_SHOW_TICKS}`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setTickLength(value) {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    const command = `${controllerID}:${Commands.SET_TICK_LENGTH}`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setTickTransparency(value) {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    const command = `${controllerID}:${Commands.SET_TICK_TRANSPARENCY}`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setTickThickness(value) {
  return (dispatch, getState) => {
    const { controllerID } = getState().ImageViewerDB;
    const command = `${controllerID}:${Commands.SET_TICK_THICKNESS}`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
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

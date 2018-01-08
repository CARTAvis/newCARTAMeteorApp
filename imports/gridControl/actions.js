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
    const controllerID = getState().ImageViewerDB.controllerID;
    // console.log('Verify getting gridControlID successfully:', gridControlID);
    const command = `${controllerID}:getDataGridState`;
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
    const controllerID = getState().ImageViewerDB.controllerID;
    const command = `${controllerID}:setShowCoordinateSystem`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setCoordinateSystem(name) {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const command = `${controllerID}:setCoordinateSystem`;
    api.instance().sendCommand(command, name)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setShowGridLines(value) {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const command = `${controllerID}:setShowGridLines`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setGridThickness(value) {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const command = `${controllerID}:setGridThickness`;
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
    const controllerID = getState().ImageViewerDB.controllerID;
    const command = `${controllerID}:setGridSpacing`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setGridTransparency(value) {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const command = `${controllerID}:setGridTransparency`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}


function setAxesThickness(value) {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const command = `${controllerID}:setAxesThickness`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setAxesTransparency(value) {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const command = `${controllerID}:setAxesTransparency`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setShowAxis(value) {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const command = `${controllerID}:setShowAxis`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setShowInternalLabels(value) {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const command = `${controllerID}:setShowInternalLabels`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setAxisX(name) {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const oldName = getState().GridDB.DataGrid.xAxis;
    if (oldName !== name) {
      const command = `${controllerID}:setAxisX`;
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

function setFontSize(value) {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const command = `${controllerID}:setFontSize`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setLabelDecimals(value) {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const command = `${controllerID}:setLabelDecimals`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setShowTicks(value) {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const command = `${controllerID}:setShowTicks`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setTickLength(value) {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const command = `${controllerID}:setTickLength`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setTickTransparency(value) {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const command = `${controllerID}:setTickTransparency`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

function setTickThickness(value) {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const command = `${controllerID}:setTickThickness`;
    api.instance().sendCommand(command, value)
      .then((response) => {
        const { data } = response;
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}

const actions = {
  getDataGrid,
  setShowCoordinateSystem,
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
  setFontSize,
  setLabelDecimals,
  setShowTicks,
  setTickLength,
  setTickTransparency,
  setTickThickness,
};

export default actions;

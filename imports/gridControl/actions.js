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

function setTickTransparency(value) {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const oldValue = getState().GridDB.DataGrid.tick.alpha;
    if (oldValue !== value) {
      const command = `${controllerID}:setTickTransparency`;
      api.instance().sendCommand(command, value)
        .then((response) => {
          const { data } = response;
          mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
        });
    }
  };
}

function setTickThickness(value) {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const oldValue = getState().GridDB.DataGrid.tick.width;
    if (oldValue !== value) {
      const command = `${controllerID}:setTickThickness`;
      api.instance().sendCommand(command, value)
        .then((response) => {
          const { data } = response;
          mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
        });
    }
  };
}

const actions = {
  getDataGrid,
  setAxisX,
  setTickTransparency,
  setTickThickness,
};

export default actions;

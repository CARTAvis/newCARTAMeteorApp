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

const actions = {
  getDataGrid,
  setAxisX,
};

export default actions;

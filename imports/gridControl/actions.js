// import { Meteor } from 'meteor/meteor';
import { mongoUpsert } from '../api/MongoHelper';
// import SessionManager from '../api/SessionManager';
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
    const gridControlID = getState().GridDB.gridControlsID;
    // console.log('Verify getting gridControlID successfully:', gridControlID);
    const command = `${gridControlID}:getDataGridState`;
    api.instance().sendCommand(command, '')
      .then((response) => {
        console.log('Test to get datagridstate', response);
        const { data } = response;
        console.log('The spread data', data);
        mongoUpsert(GridDB, { DataGrid: data }, 'SET_DATAGRID');
      });
  };
}
const actions = {
  getDataGrid,
};

export default actions;

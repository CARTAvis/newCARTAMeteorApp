import { TopbarDB } from '../api/TopbarDB';
import { RegionDB } from '../api/RegionDB';
import { mongoUpsert } from '../api/MongoHelper';
import api from '../api/ApiService';

const TOPBAR_CHANGE = 'TOPBAR_CHANGE';

export const ActionType = {
  TOPBAR_CHANGE,
};

const REGION_INIT = 'REGION_INIT';

export function setupTopbarDB() {
  // return (dispatch) => {

  api.instance().setupMongoRedux(TopbarDB, TOPBAR_CHANGE);
  // };
}

function initRegion() {
  return (dispatch, getState) => {
    const val = getState().RegionDB.init;
    mongoUpsert(RegionDB, { init: !val }, REGION_INIT);
  };
}
const actions = {
  initRegion,
};

export default actions;

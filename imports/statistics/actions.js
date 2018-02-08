import { StatsDB } from '../api/StatsDB';
import { StatsSettingsDB } from '../api/StatsSettingsDB';
import Commands from '../api/Commands';
import { mongoUpsert } from '../api/MongoHelper';
import api from '../api/ApiService';

const STATISTICS_CHANGE = 'STATISTICS_CHANGE';

export const ActionType = {
  STATISTICS_CHANGE,
};

const GET_STATS_PREF = 'GET_STATS_REF';

export function setupStatsDB() {
  // return (dispatch) => {
  api.instance().setupMongoRedux(StatsDB, STATISTICS_CHANGE);

  // };
}
// function getStatsInfo() {
//   return (dispatch, getState) => {
//     const StatsID = getState().StatsDB.StatsID;
//     const cmd = `${StatsID}:${Commands.GET_STATS_INFO}`;
//     api.instance().sendCommand(cmd, '')
//       .then((resp) => {
//         mongoUpsert(StatsDB, { stats: resp.data.stats, selectedIndex: resp.data.selectedIndex }, GET_STATS);
//       });
//   };
// }
function getStatsPref() {
  return (dispatch, getState) => {
    const StatsID = getState().StatsDB.StatsID;
    const cmd = `${StatsID}:${Commands.GET_STATS_PREF}`;
    api.instance().sendCommand(cmd, '')
      .then((resp) => {
        const dataObj = JSON.parse(resp.data.preferences);
        console.log('JSON OBJ: ', dataObj);
        mongoUpsert(StatsSettingsDB, { image: dataObj.image, region: dataObj.region }, GET_STATS_PREF);
      });
  };
}
function setupStats() {
  return (dispatch) => {
    const cmd = Commands.REGISTER_VIEWER;
    const arg = 'pluginId:Statistics,index:0';
    api.instance().sendCommand(cmd, arg)
      .then((resp) => {
        mongoUpsert(StatsDB, { StatsID: resp.data }, `Resp_${cmd}`);
        dispatch(getStatsPref());
        // dispatch(getStatsInfo());
      });
  };
}

const actions = {
  setupStats,
  getStatsPref,
};

export default actions;

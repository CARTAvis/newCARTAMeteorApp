import { StatsDB } from '../api/StatsDB';
import Commands from '../api/Commands';
import { mongoUpsert } from '../api/MongoHelper';
import api from '../api/ApiService';

const STATISTICS_CHANGE = 'STATISTICS_CHANGE';

export const ActionType = {
  STATISTICS_CHANGE,
};

const GET_STATS = 'GET_STATS';

export function setupStatsDB() {
  // return (dispatch) => {

  api.instance().setupMongoRedux(StatsDB, STATISTICS_CHANGE);
  // };
}
function getStatsInfo() {
  return (dispatch, getState) => {
    const StatsID = getState().StatsDB.StatsID;
    const cmd = `${StatsID}:${Commands.GET_STATS_INFO}`;
    api.instance().sendCommand(cmd, '')
      .then((resp) => {
        console.log('STATS INFO: ', resp.data);
        mongoUpsert(StatsDB, { stats: resp.data.stats, selectedIndex: resp.data.selectedIndex }, GET_STATS);
      });
  };
}
function setupStats() {
  return () => {
    const cmd = Commands.REGISTER_VIEWER;
    const arg = 'pluginId:Statistics,index:0';
    api.instance().sendCommand(cmd, arg)
      .then((resp) => {
        mongoUpsert(StatsDB, { StatsID: resp.data }, `Resp_${cmd}`);
        // dispatch(getStatsInfo());
      });
  };
}

const actions = {
  setupStats,
  getStatsInfo,
};

export default actions;

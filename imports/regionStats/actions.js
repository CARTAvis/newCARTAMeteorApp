import { RegionStatsDB } from '../api/RegionStatsDB';
import api from '../api/ApiService';
import { mongoUpsert } from '../api/MongoHelper';
import Commands from '../api/Commands';

const REGION_STATS_CHANGE = 'REGION_STATS_CHANGE';
const GET_REGION_STATS = 'GET_REGION_STATS';
const SET_SELECTED_REGION = 'SET_SELECTED_REGION';

export const ActionType = {
  REGION_STATS_CHANGE,
};

export function setupRegionStatsDB() {
  api.instance().setupMongoRedux(RegionStatsDB, REGION_STATS_CHANGE);
}
function getRegionStats() {
  console.log('GET REGION STATS');
  return (dispatch, getState) => {
    const StatsID = getState().StatsDB.StatsID;
    const cmd = `${StatsID}:${Commands.GET_STATS_INFO}`;
    api.instance().sendCommand(cmd, '')
      .then((resp) => {
        const regionStats = [];
        for (let i = 0; i < resp.data.stats.length; i += 1) {
          const temp = [];
          for (let j = 1; j < resp.data.stats[i].length; j += 1) {
            temp.push(resp.data.stats[i][j]);
          }
          regionStats.push(temp);
        }
        mongoUpsert(RegionStatsDB, { regionStats }, GET_REGION_STATS);
      });
  };
}
function setSelectedRegion(index) {
  return () => {
    mongoUpsert(RegionStatsDB, { selectedRegion: index }, SET_SELECTED_REGION);
  };
}
const actions = {
  getRegionStats,
  setSelectedRegion,
};
export default actions;

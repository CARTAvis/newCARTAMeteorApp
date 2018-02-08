import { ImageStatsDB } from '../api/ImageStatsDB';
import api from '../api/ApiService';
import { mongoUpsert } from '../api/MongoHelper';
import Commands from '../api/Commands';
import regionStatsActions from '../regionStats/actions';

const IMAGE_STATS_CHANGE = 'IMAGE_STATS_CHANGE';
const GET_IMAGE_STATS = 'GET_IMAGE_STATS';

export const ActionType = {
  IMAGE_STATS_CHANGE,
};

export function setupImageStatsDB() {
  api.instance().setupMongoRedux(ImageStatsDB, IMAGE_STATS_CHANGE);
}
function getImageStats() {
  console.log('GET IMAGE STATS');
  return (dispatch, getState) => {
    const StatsID = getState().StatsDB.StatsID;
    const cmd = `${StatsID}:${Commands.GET_STATS_INFO}`;
    api.instance().sendCommand(cmd, '')
      .then((resp) => {
        // add region stats
        if (resp.data.stats[resp.data.selectedIndex].length > 1) {
          dispatch(regionStatsActions.getRegionStats());
        }
        const imageStats = [];
        for (let i = 0; i < resp.data.stats.length; i += 1) {
          imageStats.push(resp.data.stats[i][0]);
        }
        mongoUpsert(ImageStatsDB, { imageStats, selectedIndex: resp.data.selectedIndex }, GET_IMAGE_STATS);
      });
  };
}
const actions = {
  getImageStats,
};
export default actions;

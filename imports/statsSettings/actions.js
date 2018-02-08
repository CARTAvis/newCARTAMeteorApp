import { StatsSettingsDB } from '../api/StatsSettingsDB';
import Commands from '../api/Commands';
import { mongoUpsert } from '../api/MongoHelper';
import api from '../api/ApiService';
import statsActions from '../statistics/actions';

const STATS_SETTINGS_CHANGE = 'STAT_SETTINGS_CHANGE';

export const ActionType = {
  STATS_SETTINGS_CHANGE,
};


export function setupStatsSettingsDB() {
  api.instance().setupMongoRedux(StatsSettingsDB, STATS_SETTINGS_CHANGE);
}
function setStatVisible(visible, name, type) {
  return (dispatch, getState) => {
    const StatsID = getState().StatsDB.StatsID;
    const cmd = `${StatsID}:${Commands.SET_STATS_VISIBLE}`;
    const arg = `visible:${visible}, name:${name}, type:${type}`;
    api.instance().sendCommand(cmd, arg)
      .then(() => {
        dispatch(statsActions.getStatsPref());
      });
  };
}
const actions = {
  setStatVisible,
};

export default actions;

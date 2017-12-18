import { ActionType } from './actions';

const defaultState = { data: {} };
const GridDB = (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.DATAGRID_CHANGE: {
      return action.payload.data;
    }
    case 'RESET_REDUX_STATE':
      return defaultState;
    default:
      return state;
  }
};

const GridReducer = {
  GridDB,
};

export default GridReducer;

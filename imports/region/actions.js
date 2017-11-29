// @flow

import update from 'immutability-helper';
// import { Meteor } from 'meteor/meteor';
import { RegionDB } from '../api/RegionDB';
// import SessionManager from '../api/SessionManager';
import { mongoUpsert } from '../api/MongoHelper';
import api from '../api/ApiService';
import type { ControlPoint, RectangularRegion } from './models';
import type { ThunkAction } from '../shared/action.models';
import Commands from '../api/Commands';

export const ActionType = {
  REGION_CHANGE: 'REGION_CHANGE',
};

export const SubActions = {
  DRAW: 'DRAW',
  SET_MOUSE: 'SET_MOUSE',
  SET_SHAPE: 'SET_SHAPE',
  RESHAPE: 'RESHAPE',
  MOVERECT: 'MOVERECT',
  RESIZERECT: 'RESIZERECT',
  DELETE: 'DELETE',
};


export function setupRegionDB() {
  // return (dispatch) => {

  api.instance().setupMongoRedux(RegionDB, ActionType.REGION_CHANGE);
  // };
}

// the creating one
function drawShape(coordX: number, coordY: number, width: number, height: number) {
  return () => {
    // this is action.payload.data
    mongoUpsert(RegionDB, { x: coordX, y: coordY, width, height }, SubActions.DRAW);
  };
}

function setMouseIsDown(val: boolean) {
  return () => {
    mongoUpsert(RegionDB, { mouseIsDown: val }, SubActions.SET_MOUSE);
  };
}

// TODO: controlPoints: consier to use object instead of array,
// 'topLeft': 0
// 'topRight': 1
// 'bottomLeft': 2
// 'bottomRight': 3
const POS_0 = 'topLeft';
const POS_1 = 'topRight';
const POS_2 = 'bottomLeft';
const POS_3 = 'bottomRight';

function makeControlPoints(x: number, y: number, width: number, height: number): ControlPoint[] {
  return [{ pos: 'topLeft', x, y }, { pos: 'topRight', x: (x + width), y }, {
    pos: 'bottomLeft',
    x,
    y: (y + height)
  }, { pos: 'bottomRight', x: (x + width), y: (y + height) }];
}

// mouse up
function setShape(x: number, y: number, width: number, height: number): ThunkAction {
  return (dispatch, getState) => {
    const stateTree = getState().RegionDB;
    if (!stateTree.regionArray) {
      mongoUpsert(RegionDB, {
        regionArray: [{
          x,
          y,
          w: width,
          h: height,
          controlPoints: makeControlPoints(x, y, width, height),
          key: Math.floor(Math.random() * 10000),
        }]
      }, SubActions.SET_SHAPE);
    } else {
      const newArr = stateTree.regionArray.concat({
        x,
        y,
        w: width,
        h: height,
        controlPoints: makeControlPoints(x, y, width, height),
        key: Math.floor(Math.random() * 10000),
      });
      mongoUpsert(RegionDB, { regionArray: newArr }, SubActions.SET_SHAPE);
    }
  };
}

function remove(target: number): ThunkAction {
  return (dispatch, getState) => {
    const array = getState().RegionDB.regionArray;
    const regionControlsID = getState().RegionDB.regionControlsID;
    const cmd = `${regionControlsID}:${Commands.CLOSE_REGION}`;
    for (let i = 0; i < array.length; i++) {
      if (array[i].key === target) {
        const arg = `region:${i}`;
        api.instance().sendCommand(cmd, arg)
          .then((resp) => {
            console.log('CLOSE REGION RESP: ', resp);
          });
        break;
      }
    }
    mongoUpsert(RegionDB, { regionArray: array.filter(item => item.key !== target) }, SubActions.DELETE);
  };
}

function resizeRect(newX: number, newY: number, pos: string, index: number): ThunkAction {
  return (dispatch, getState) => {
    const regions: RectangularRegion[] = getState().RegionDB.regionArray;

    const region = regions[index];
    switch (pos) {
      case POS_0:
        region.controlPoints[0].x = newX;
        region.controlPoints[0].y = newY;
        region.controlPoints[1].y = newY;
        region.controlPoints[2].x = newX;
        break;
      case POS_1:
        region.controlPoints[1].x = newX;
        region.controlPoints[1].y = newY;
        region.controlPoints[0].y = newY;
        region.controlPoints[3].x = newX;
        break;
      case POS_2:
        region.controlPoints[2].x = newX;
        region.controlPoints[2].y = newY;
        region.controlPoints[0].x = newX;
        region.controlPoints[3].y = newY;
        break;
      case POS_3:
        region.controlPoints[3].x = newX;
        region.controlPoints[3].y = newY;
        region.controlPoints[1].x = newX;
        region.controlPoints[2].y = newY;
        break;
      default:
        break;
    }
    const newRectX = Math.min(region.controlPoints[0].x,
      region.controlPoints[1].x,
      region.controlPoints[2].x,
      region.controlPoints[3].x);

    const newRectY = Math.min(region.controlPoints[0].y,
      region.controlPoints[1].y,
      region.controlPoints[2].y,
      region.controlPoints[3].y);

    const newDiagonalRectX = Math.max(region.controlPoints[0].x,
      region.controlPoints[1].x,
      region.controlPoints[2].x,
      region.controlPoints[3].x);

    const newDiagonalRectY = Math.max(region.controlPoints[0].y,
      region.controlPoints[1].y,
      region.controlPoints[2].y,
      region.controlPoints[3].y);

    const newArray = update(regions[index],
      {
        x: { $set: newRectX },
        y: { $set: newRectY },
        w: { $set: (newDiagonalRectX - newRectX) },
        h: { $set: (newDiagonalRectY - newRectY) },
        controlPoints: { $set: region.controlPoints },
      });

    const data = update(regions, { $splice: [[index, 1, newArray]] });
    mongoUpsert(RegionDB, { regionArray: data }, SubActions.RESIZERECT);
  };
}

function moveRect(newX: number, newY: number, index: number): ThunkAction {
  return (dispatch, getState) => {
    const array: RectangularRegion[] = getState().RegionDB.regionArray;
    const newArray = update(array[index],
      {
        x: { $set: newX },
        y: { $set: newY },
        controlPoints: { $set: makeControlPoints(newX, newY, array[index].w, array[index].h) },
      });
    const data = update(array, { $splice: [[index, 1, newArray]] });
    mongoUpsert(RegionDB, { regionArray: data }, SubActions.MOVERECT);
  };
}

function reshape(newW: number, newH: number, newX: number, newY: number, index: number): ThunkAction {
  return (dispatch, getState) => {
    const array: RectangularRegion[] = getState().RegionDB.regionArray;
    const newArray = update(array[index],
      {
        x: { $set: newX }, y: { $set: newY }, w: { $set: newW }, h: { $set: newH },
      });
    const data = update(array, { $splice: [[index, 1, newArray]] });
    mongoUpsert(RegionDB, { regionArray: data }, SubActions.RESHAPE);
  };
}

const actions = {
  drawShape,
  setMouseIsDown,
  setShape,
  reshape,
  remove,
  moveRect,
  resizeRect,
};

export default actions;

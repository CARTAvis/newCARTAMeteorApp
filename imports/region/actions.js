import update from 'immutability-helper';
// import { Meteor } from 'meteor/meteor';
import { RegionDB } from '../api/RegionDB';
import { ImageViewerDB } from '../api/ImageViewerDB';
// import SessionManager from '../api/SessionManager';
import { mongoUpsert } from '../api/MongoHelper';
import api from '../api/ApiService';
import Commands from '../api/Commands';
import profilerActions from '../profiler/actions';

const REGION_CHANGE = 'REGION_CHANGE';

export const ActionType = {
  REGION_CHANGE,
};

const DRAW = 'DRAW';
const SET_MOUSE = 'SET_MOUSE';
const SET_SHAPE = 'SET_SHAPE';
const RESHAPE = 'RESHAPE';
const MOVERECT = 'MOVERECT';
const RESIZERECT = 'RESIZERECT';
const DELETE = 'DELETE';
const REGION_INIT = 'REGION_INIT';
export function setupRegionDB() {
  // return (dispatch) => {

  api.instance().setupMongoRedux(RegionDB, REGION_CHANGE);
  // };
}

// the creating one
function drawShape(coordX, coordY, width, height) {
  return () => {
    // this is action.payload.data
    mongoUpsert(RegionDB, { x: coordX, y: coordY, width, height }, DRAW);
  };
}

function setMouseIsDown(val) {
  return () => {
    mongoUpsert(RegionDB, { mouseIsDown: val }, SET_MOUSE);
  };
}

// TODO: circles: consier to use object instead of array,
// 'topLeft': 0
// 'topRight': 1
// 'bottomLeft': 2
// 'bottomRight': 3
const POS_0 = 'topLeft';
const POS_1 = 'topRight';
const POS_2 = 'bottomLeft';
const POS_3 = 'bottomRight';
function makeCircles(x, y, width, height) {
  return [{ pos: 'topLeft', x, y }, { pos: 'topRight', x: (x + width), y }, { pos: 'bottomLeft', x, y: (y + height) }, { pos: 'bottomRight', x: (x + width), y: (y + height) }];
}

// mouse up
function setShape(x, y, width, height) {
  return (dispatch, getState) => {
    const stateTree = getState().RegionDB;
    if (!stateTree.regionArray) {
      mongoUpsert(RegionDB, { regionArray: [{
        x,
        y,
        w: width,
        h: height,
        circles: makeCircles(x, y, width, height),
        key: Math.floor(Math.random() * 10000),
      }] }, SET_SHAPE);
    } else {
      const newArr = stateTree.regionArray.concat({
        x,
        y,
        w: width,
        h: height,
        circles: makeCircles(x, y, width, height),
        key: Math.floor(Math.random() * 10000),
      });
      mongoUpsert(RegionDB, { regionArray: newArr }, SET_SHAPE);
    }
  };
}
function remove(target) {
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
    mongoUpsert(RegionDB, { regionArray: array.filter(item => item.key !== target) }, DELETE);
  };
}

function resizeRect(newX, newY, pos, index) {
  return (dispatch, getState) => {
    const array = getState().RegionDB.regionArray;

    const region = array[index];
    switch (pos) {
      case POS_0:
        region.circles[0].x = newX;
        region.circles[0].y = newY;
        region.circles[1].y = newY;
        region.circles[2].x = newX;
        break;
      case POS_1:
        region.circles[1].x = newX;
        region.circles[1].y = newY;
        region.circles[0].y = newY;
        region.circles[3].x = newX;
        break;
      case POS_2:
        region.circles[2].x = newX;
        region.circles[2].y = newY;
        region.circles[0].x = newX;
        region.circles[3].y = newY;
        break;
      case POS_3:
        region.circles[3].x = newX;
        region.circles[3].y = newY;
        region.circles[1].x = newX;
        region.circles[2].y = newY;
        break;
      default:
        break;
    }
    const newRectX = Math.min(region.circles[0].x,
      region.circles[1].x,
      region.circles[2].x,
      region.circles[3].x);

    const newRectY = Math.min(region.circles[0].y,
      region.circles[1].y,
      region.circles[2].y,
      region.circles[3].y);

    const newDiagonalRectX = Math.max(region.circles[0].x,
      region.circles[1].x,
      region.circles[2].x,
      region.circles[3].x);

    const newDiagonalRectY = Math.max(region.circles[0].y,
      region.circles[1].y,
      region.circles[2].y,
      region.circles[3].y);

    const newArray = update(array[index],
      { x: { $set: newRectX },
        y: { $set: newRectY },
        w: { $set: (newDiagonalRectX - newRectX) },
        h: { $set: (newDiagonalRectY - newRectY) },
        circles: { $set: region.circles },
      });

    // const newArray = update(array[index],
      // { x: { $set: newX },
      //   y: { $set: newY },
      //   circles: { $set: makeCircles(newX, newY, array[index].w, array[index].h) },
      // });
    const data = update(array, { $splice: [[index, 1, newArray]] });
    mongoUpsert(RegionDB, { regionArray: data }, RESIZERECT);
  };
}
function updateRegionOnZoom() {
  return (dispatch, getState) => {
    const array = getState().RegionDB.regionArray;
    const newData = getState().RegionDB.regionZoomData;
    let item = null;
    let newDataArray = array;
    let newCircles = null;
    for (let i = 0; i < array.length; i += 1) {
      newCircles = makeCircles(newData[i].x, newData[i].y, newData[i].width, newData[i].height);
      item = update(array[i], {
        x: { $set: newData[i].x },
        y: { $set: newData[i].y },
        w: { $set: newData[i].width },
        h: { $set: newData[i].height },
        circles: { $set: newCircles },
      });
      // remove item at index i and replace it with 'item'
      newDataArray = update(newDataArray, { $splice: [[i, 1, item]] });
    }
    mongoUpsert(RegionDB, { regionArray: newDataArray }, RESIZERECT);
  };
}
function moveRect(newX, newY, index) {
  return (dispatch, getState) => {
    const array = getState().RegionDB.regionArray;
    const newArray = update(array[index],
      { x: { $set: newX },
        y: { $set: newY },
        circles: { $set: makeCircles(newX, newY, array[index].w, array[index].h) },
      });
    const data = update(array, { $splice: [[index, 1, newArray]] });
    mongoUpsert(RegionDB, { regionArray: data }, MOVERECT);
  };
}

function reshape(newW, newH, newX, newY, index) {
  return (dispatch, getState) => {
    const array = getState().RegionDB.regionArray;
    const newArray = update(array[index],
      { x: { $set: newX }, y: { $set: newY }, w: { $set: newW }, h: { $set: newH },
      });
    const data = update(array, { $splice: [[index, 1, newArray]] });
    mongoUpsert(RegionDB, { regionArray: data }, RESHAPE);
  };
}
function selectRegion(x, y) {
  return (dispatch, getState) => {
    const controllerID = getState().ImageViewerDB.controllerID;
    const cmd = `${controllerID}:${Commands.INPUT_EVENT}`;
    const arg = `{"type":"touch","x":${x},"y":${y}}`;
    api.instance().sendCommand(cmd, arg)
      .then((resp) => {
        console.log('SELECT REGION RESP: ', resp);
      });
  };
}
function initRegion() {
  return () => {
    mongoUpsert(RegionDB, { init: false }, REGION_INIT);
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
  selectRegion,
  updateRegionOnZoom,
  initRegion,
};

export default actions;

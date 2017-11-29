// @flow
import type { RectangularRegion } from '../region/models';

export type FileBrowserState = {
  fileBrowserOpened: boolean,
    rootDir: string,
    selectedFile: number,
    files: [{name: string, type: string}],
}

export type ImageViewerState = {
  controllerID: string,
  imageURL: string,
  actionSubType: string,
  sessionID: string,
}

export type RegionState = {
  x: number,
  y: number,
  width: number,
  height: number,
  mouseIsDown: boolean,
  regionArray: RectangularRegion[],
  actionSubType: string,
  sessionID: string,
}

export type HistogramState = {
  data: {},
}

export type ProfilerState = {
  data: {},
  actionSubType: string,
  sessionID: string,
  zoomPanData: {},
}

export type FeatureItem = {
  i: string,
  x: number,
  y: number,
  w: number,
  h: number,
  type: string,
  isResizable: boolean
}

export type FeatureContainerState = {
  items: FeatureItem[],
  actionSubType: string,
  sessionID: string,
}

export type AnimatorState = {
  animatorID: string,
  currentAnimatorType: string,
  actionSubType: string,
  sessionID: string,
}

export type State = {
  sessionID: string,
  FileBrowserDB: FileBrowserState,
  ImageViewerDB: ImageViewerState,
  RegionDB: RegionState,
  HistogramDB: HistogramState,
  ProfilerDB: ProfilerState,
  FeatureContainerDB: FeatureContainerState,
  AnimatorDB: AnimatorState,
}
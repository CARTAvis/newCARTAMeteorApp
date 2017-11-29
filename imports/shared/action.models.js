// @flow

import type { RectangularRegion } from '../region/models';
import type { State } from './state.models';

export type RegionAction = {
    data: {
        actionSubType: string,
        _id: string,
        sessionID: string,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        mouseIsDown: boolean,
        regionArray?: RectangularRegion[],
    }
}

export type HistogramAction = {
    data: any
}

export type Action =
    | { type: 'REGION_CHANGE', payload: RegionAction }
    | { type: 'HISTOGRAM_CHANGE', payload: HistogramAction }
    | { type: 'RESET_REDUX_STATE' }

export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;

// @flow

export type ControlPoint = {
    pos: string,
    x: number,
    y: number,
}

export type RectangularRegion = {
    controlPoints: ControlPoint[],
    w: number,
    h: number,
    x: number,
    y: number,
    key: number,
}

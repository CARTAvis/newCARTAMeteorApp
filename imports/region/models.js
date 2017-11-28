// @flow

export type Circle = {
    pos: string,
    x: number,
    y: number,
}

export type RectangularRegion = {
    circles: Circle[],
    w: number,
    h: number,
    x: number,
    y: number,
    key: number,
}

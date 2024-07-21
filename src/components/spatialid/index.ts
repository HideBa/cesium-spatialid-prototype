import {Space} from "@spatial-id/javascript-sdk";

export type coordToSpace = (coord: [number, number, number], zoomLevel:number) => Space;
export type spaceToCoord = (space: Space) => [number, number, number|undefined];
export type spaceBottom = (space: Space) => [number, number, number,number]; //[xmin, ymin, xmax, ymax]
export type verticalAdjanentSpaces = (space: Space, limit: number) => Space[];


export const coordToSpace: coordToSpace = (coord: [number, number, number]/*lng, lat, alt**/, zoomLevel: number) => {
  return new Space({lng: coord[0], lat: coord[1], alt: coord[2]}, zoomLevel);
};

export const spaceToCoord: spaceToCoord = (space: Space) => {
  return [space.center.lng, space.center.lat, space.center.alt];
};

export const spaceBottom: spaceBottom = (space: Space) => {
  const vertices3d = space.vertices3d();
  const x = vertices3d.map(v => v[0]);
  const y = vertices3d.map(v => v[1]);
  const minx = Math.min(...x);
  const miny = Math.min(...y);
  const maxx = Math.max(...x);
  const maxy = Math.max(...y);
  return  [minx, miny, maxx, maxy]; //west, south, east, north
};

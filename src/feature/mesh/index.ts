import { japanmesh, LatLngBounds } from "japanmesh"
import {Feature, FeatureCollection, Polygon} from "geojson"

export type Mesh = Feature & {
  properties: {
    code: string;
  }
}
export type MeshCollection = FeatureCollection & {
  features: Mesh[];
}


const meshLevelPairs = [{level: 1, actualLevel: 80000}, {level: 2, actualLevel: 10000}, { level: 3, actualLevel: 1000}]

export const createMesh = (meshLevel: number, bbox: [number, number, number, number]): MeshCollection => {//min_lon, min_lat, max_lon, max_lat
  if (meshLevel < 1 || meshLevel > 5){
    throw new Error("meshLevel should be between 1 and 5");
  }
  if (bbox.length !== 4){
    throw new Error("bbox should be an array of 4 numbers");
  }
  if (bbox[0] > bbox[2] || bbox[1] > bbox[3]){
    throw new Error("bbox should be a valid bbox");
  }
  const meshBounds = new LatLngBounds(...bbox)
  const meshCodes = japanmesh.getCodesWithinBounds(meshBounds, meshLevelPairs.find(pair => pair.level === meshLevel)?.actualLevel);

  return {
    type: "FeatureCollection",
    features: meshCodes.map(code => ({
      type: "Feature",
      properties: { code },
      geometry: japanmesh.toGeoJSON(code).geometry as Polygon
    }))
  };
}

import * as Cesium from 'cesium';

const EARTH_RADIUS = 6378137.0;

export const calculateZoomLevel =(scene: Cesium.Scene): number=> {

const height = scene.camera.positionCartographic.height;
  const zoomLevel = Math.floor(Math.log2(2*Math.PI*EARTH_RADIUS / height) - 1);
  const level= Math.max(0, Math.min(zoomLevel, 21));
  return level
}

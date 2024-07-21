import * as Cesium from "cesium";


const heading = Cesium.Math.toRadians(50.0)
const pitch = Cesium.Math.toRadians(-20.0);
const range = 5000.0;
export const CAMERA_OFFSET: [number, number, number] = [heading, pitch, range];
export const CAMERA_POSITION: [number, number, number] = [139.767052, 35.681167, 1000];

import { Cartesian2, Cartesian3, Scene, Viewer } from "cesium";
import { useCesium } from "resium";
import { createMesh } from "../../../feature/mesh"
import { useCallback, useEffect, useState } from "react";
import { throttle } from "../../../util/throttle";

export type RegionMeshProps = {

};
const MAX_HEIGHT = 100000;
const getCameraFructumBbox = (viewer: Viewer, scene: Scene): [number, number, number, number]|undefined => {
  const camera = scene.camera;
  const frustum = camera.frustum;
  const distance = camera.positionCartographic.height;
  if(distance > MAX_HEIGHT) {
    return undefined
  }

  const corners = [
    new Cartesian3(),
    new Cartesian3(),
    new Cartesian3(),
    new Cartesian3()
  ];
  const near = frustum.near;
  const far = Math.min(frustum.far, distance);

  frustum.getPixelDimensions(scene.drawingBufferWidth, scene.drawingBufferHeight, far, scene.pixelRatio, corners[0]);
  const dimension = new Cartesian2(corners[0].x, corners[0].y);

  frustum.getPixelDimensions(scene.drawingBufferWidth, scene.drawingBufferHeight, near, scene.pixelRatio, corners[0]);

  Cartesian3.multiplyByScalar(camera.right, dimension.x * 0.5, corners[1]);
  Cartesian3.multiplyByScalar(camera.up, dimension.y * 0.5, corners[2]);

  Cartesian3.add(camera.position, corners[1], corners[1]);
  Cartesian3.add(corners[1], corners[2], corners[0]);
  Cartesian3.subtract(corners[1], corners[2], corners[1]);
  Cartesian3.subtract(camera.position, corners[1], corners[2]);
  Cartesian3.subtract(camera.position, corners[2], corners[3]);

  const ellipsoid = scene.globe.ellipsoid;
  const cornerCartographics = corners.map(corner => ellipsoid.cartesianToCartographic(corner));

  const west = Math.min(...cornerCartographics.map(c => c.longitude));
  const east = Math.max(...cornerCartographics.map(c => c.longitude));
  const south = Math.min(...cornerCartographics.map(c => c.latitude));
  const north = Math.max(...cornerCartographics.map(c => c.latitude));
  return [west, north, east, south];
}

export const RegionMesh = ({}: RegionMeshProps) => {
  const {viewer} = useCesium();
  const [cameraMove, setCameraMove] = useState(false);
  if(!viewer) {
    return null;
  }

  const getMeshes = useCallback(
    throttle((scene: Scene) => {
      const bbox = getCameraFructumBbox(viewer, scene);
      if(!bbox) {
        return;
      }
      const meshes = createMesh(2, bbox);
      return meshes;
    }, 200)
  , []);
  //register cesium event listener to detect camera move. It also throttle the call to optimise perfomance
  useEffect(() => {
  if(!viewer){
    return;
  }
  const removeCallback = viewer.camera.changed.addEventListener(() => {
    getMeshes(viewer.scene)
  });
  return () => {
    removeCallback();
  }}
  , [viewer, getMeshes]);


  // const cameraBbox = useMemo(() => getCameraFructumBbox(viewer, viewer.scene), [viewer, cameraMove]);
  // if(!cameraBbox) {
  //   return null;
  // }

  // const meshes = useMemo(() => {
  //   return createMesh(2, cameraBbox);
  // }, [cameraBbox]);

  return (

  )
}
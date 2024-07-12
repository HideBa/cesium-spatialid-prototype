import { useCallback, useEffect, useMemo, useState } from "react";
import { coordToSpace, spaceBottom } from "./spatialid/index";
import { Cartesian3 } from "cesium";

const MAX_CUBE = 10;

export const useHooks= () => {
  const [zoomLevel, setZoomLevel] = useState(14);
  const [currentCoord, setCurrentCoord] = useState<[number,number] | undefined>(undefined); //lat, lng
  const [mode, setMode] = useState<"square" | "cube">("cube");

  const handleCoordChange = useCallback(
    (coord: [number, number]) => {
      setCurrentCoord(coord);
    },
    [setCurrentCoord]
  );

  const handleChange = useCallback(
    (value: number) => {
      setZoomLevel(value);
    },
    [setZoomLevel]
  );

  const toggleMode = useCallback(
    () => {
      setMode(mode === "square" ? "cube" : "square");
    },
    [mode]
  );

  const squareCoordinates = useMemo(() => {
    if (currentCoord){
      const space = coordToSpace([currentCoord[1], currentCoord[0], 0], zoomLevel);
      return spaceBottom(space);
    }
    return undefined;
  }, [currentCoord, zoomLevel])



  const cubeCoordinates: [Cartesian3[], Cartesian3] | undefined = useMemo(() => {
    if (currentCoord){
      const space = coordToSpace([currentCoord[1], currentCoord[0], 0], zoomLevel);
      const vertices = space.vertices3d();
      //find minx, miny, minz, maxx, maxy, maxz
      const x = vertices.map(v => v[0]);
      const y = vertices.map(v => v[1]);
      const z = vertices.map(v => v[2]);
      const minx = Math.min(...x);
      const miny = Math.min(...y);
      const minz = Math.min(...z);
      const maxx = Math.max(...x);
      const maxy = Math.max(...y);
      const maxz = Math.max(...z);
      const centerX = (minx + maxx) / 2;
      const centerY = (miny + maxy) / 2;

      const diff_z = Math.abs(maxz - minz);
      const dimension = new Cartesian3(diff_z, diff_z, diff_z);


      const centers = Array.from({ length: MAX_CUBE }, (_, i) => Cartesian3.fromDegrees(centerX, centerY, minz + (diff_z * i)));

      return [centers, dimension]
    }
    return undefined;
  }
  , [currentCoord, zoomLevel])

  return {
    zoomLevel,
    currentCoord,
    handleCoordChange,
    handleChange,
    squareCoordinates,
    mode,
    toggleMode,
    cubeCoordinates
  };
};

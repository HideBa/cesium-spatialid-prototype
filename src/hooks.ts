import { useCallback, useEffect, useState } from "react";
import { coordToSpace, spaceBottom } from "./spatialid/index";

export const useHooks= () => {
  const [zoomLevel, setZoomLevel] = useState(14);
  const [currentCoord, setCurrentCoord] = useState<[number,number] | undefined>(undefined); //lat, lng
  const [squareCoords, setSquareCoords] = useState<[number, number, number, number] | undefined>(undefined)
  const [mode, setMode] = useState<"square" | "cube">("cube");
  const [cubeCoodinates, setCubeCoodinates] = useState<[number, number, number, number, number, number] | undefined>(undefined)

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



  useEffect(() => {
    if (currentCoord){
      setSquareCoords(spaceBottom(coordToSpace([currentCoord[1], currentCoord[0], 0], zoomLevel)))
      }

      if(mode === "cube" && currentCoord){
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
        setCubeCoodinates([minx, miny, minz, maxx, maxy, maxz]);
      }
  }, [currentCoord, mode, zoomLevel])



  return {
    zoomLevel,
    currentCoord,
    handleCoordChange,
    handleChange,
    squareCoords,
    mode,
    toggleMode,
    cubeCoodinates
  };
};

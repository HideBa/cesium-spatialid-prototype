import { useCallback, useEffect, useState } from "react";
import { coordToSpace, spaceBottom } from "./spatialid/index";

export const useHooks= () => {
  const [zoomLevel, setZoomLevel] = useState(14);
  const [currentCoord, setCurrentCoord] = useState<[number,number] | undefined>(undefined); //lat, lng
  const [squareCoords, setSquareCoords] = useState<[number, number, number, number] | undefined>(undefined)
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


  useEffect(() => {
    if (currentCoord){
      setSquareCoords(spaceBottom(coordToSpace([currentCoord[1], currentCoord[0], 0], zoomLevel)))
      }
  }, [currentCoord, zoomLevel])



  return {
    zoomLevel,
    currentCoord,
    handleCoordChange,
    handleChange,
    squareCoords
  };
};

import { useCallback, useMemo, useState } from "react";
import { coordToSpace, spaceBottom } from "./spatialid/index";
import { Cartesian3 } from "cesium";

const MAX_CUBE = 10;
const CAMERA_POSITION = [139.767052, 35.681167, 10000];


export const useHooks= () => {
  const [zoomLevel, setZoomLevel] = useState(14);
  const [currentCoord, setCurrentCoord] = useState<[number,number] | undefined>(undefined); //lat, lng
  const [mode, setMode] = useState<"square" | "cube">("cube");
  const modes = ["square", "cube"];
  const [selectedCubeId, setSelectedCubeId] = useState<string|undefined>(undefined);

  const defaultCamera = useMemo(() => {
    return new Cartesian3(...CAMERA_POSITION)
  }, [])

  const handleCoordChange = useCallback(
    (coord: [number, number]) => {
      setCurrentCoord(coord);
    },
    [setCurrentCoord]
  );

  const handleZoomLevelChange = useCallback(
    (value: number) => {
      setZoomLevel(value);
    },
    [setZoomLevel]
  );

  const isMode = (mode: unknown): mode is "square" | "cube" => {
    return mode === "square" || mode === "cube";
  };

  const handleModeChange = useCallback(
    (mode: string) => {
      if (!isMode(mode)) {
        return;
      }
      setMode(mode === "square" ? "square" : "cube");
    },
    []
  );

  const squareCoordinates = useMemo(() => {
    if (currentCoord){
      const space = coordToSpace([currentCoord[1], currentCoord[0], 0], zoomLevel);
      return spaceBottom(space);
    }
    return undefined;
  }, [currentCoord, zoomLevel])


  const handleCubeSelect = useCallback(
    (id: string) => {
      setSelectedCubeId(id);
    },
    [setSelectedCubeId]);


  const cubes = useMemo(() => {
    if (currentCoord){
      const buttomSpace = coordToSpace([currentCoord[1], currentCoord[0], 0], zoomLevel);
      const spaces = Array.from({length: MAX_CUBE}, (_, i) => i).map(i => buttomSpace.up(i));

      const cubes = spaces.map(space => {
      const vertices = space.vertices3d();

      const z = vertices.map(v => v[2]);

      const minz = Math.min(...z);

      const maxz = Math.max(...z);
      const centerX = space.center.lng;
      const centerY = space.center.lat;

      const diff_z = Math.abs(maxz - minz);
      const dimension: [number, number, number] = [diff_z, diff_z, diff_z]
      const center: [number, number, number] = [centerX, centerY, space.center.alt ?? 0]
      const id = space.id;
      return {
        id,
        center,
        dimension
      }
    });
    return cubes;
    }
    return undefined;
  }
  , [currentCoord, zoomLevel])

  return {
    defaultCamera,
    zoomLevel,
    handleCoordChange,
    handleZoomLevelChange,
    squareCoordinates,
    mode,
    modes,
    handleModeChange,
    cubes,
    selectedCubeId,
    handleCubeSelect
  };
};

import { useCallback, useMemo, useState } from "react";
import { coordToSpace, spaceBottom } from "./spatialid/index";
import { Cartesian3 } from "cesium";

const MAX_CUBE = 10;


export const useHooks= () => {
  const [zoomLevel, setZoomLevel] = useState(14);
  const [currentCoord, setCurrentCoord] = useState<[number,number] | undefined>(undefined); //lat, lng
  const [mode, setMode] = useState<"square" | "cube">("cube");
  const modes = ["square", "cube"];
  const [selectedCubeId, setSelectedCubeId] = useState<string|undefined>(undefined);

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
      const center = Cartesian3.fromDegrees(centerX, centerY, space.center.alt);
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
    zoomLevel,
    currentCoord,
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

import { MapViewer } from "./feature/mapViewer/map";
import UIContainer from "./ui";
import { useHooks } from "./hooks";

import { Controller } from "./feature/controller";
import ApiTester from "./feature/apiTester";
import { CAMERA_POSITION, CAMERA_OFFSET } from "./const";

const SpatialIdRequester = () => {
  const {
    zoomLevel,
    handleCoordChange,
    handleZoomLevelChange,
    squareCoordinates,
    mode,
    modes,
    handleModeChange,
    cubes,
    selectedCubeId,
    handleCubeSelect,
  } = useHooks();
  return (
    <div>
      <UIContainer>
        <Controller
          zoomLevelRange={[0, 20]}
          onZoomLevelChange={handleZoomLevelChange}
          zoomLevel={zoomLevel}
          mode={mode}
          onModeChange={handleModeChange}
          modes={modes}
        />
        {selectedCubeId && <ApiTester />}
      </UIContainer>
      <MapViewer
        defaultCameraPosition={CAMERA_POSITION}
        defaultCameraOffset={CAMERA_OFFSET}
        onCoordinateChange={handleCoordChange}
        onCubeSelect={handleCubeSelect}
        cubeId={selectedCubeId}
        mode={mode}
        squareCoordinates={squareCoordinates}
        cubes={cubes}
      ></MapViewer>
      {/* <Visualizer
        mode={mode}
        cubes={cubes}
        onCubeSelect={handleCubeSelect}
        onCoordinateChange={handleCoordChange}
        cubeId={selectedCubeId}
        squareCoordinates={squareCoordinates}
        defaultCameraPosition={CAMERA_POSITION}
      /> */}
    </div>
  );
};

export default SpatialIdRequester;

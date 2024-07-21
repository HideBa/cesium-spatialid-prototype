import { MapViewer } from "./feature/map";
import UIContainer from "./ui";
import Square from "./cesium/square/square";
import { useHooks } from "./hooks";
import Cube from "./cesium/square/cube";
import { Controller } from "./feature/controller";
import ApiTester from "./feature/apiTester";

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
          zoomLevelRange={[14, 18]}
          onZoomLevelChange={handleZoomLevelChange}
          zoomLevel={zoomLevel}
          mode={mode}
          onModeChange={handleModeChange}
          modes={modes}
        />
        {selectedCubeId && <ApiTester />}
      </UIContainer>
      <MapViewer
        onCoordinateChange={handleCoordChange}
        onCubeSelect={handleCubeSelect}
        cubeId={selectedCubeId}
      >
        {mode === "square" && squareCoordinates && (
          <Square coordinate={squareCoordinates} />
        )}
        {mode === "cube" &&
          cubes?.length &&
          cubes?.map(({ id, center, dimension }) => (
            <Cube
              key={id}
              id={id}
              center={center}
              dimension={dimension}
              color={"#00bebe"}
              alpha={0.2}
            />
          ))}
      </MapViewer>
    </div>
  );
};

export default SpatialIdRequester;

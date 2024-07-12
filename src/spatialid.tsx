import ZoomLevelSlider from "./components/form/slider";
import { MapViewer } from "./feature/map";
import UIContainer from "./ui";
import Square from "./cesium/square/square";
import { useHooks } from "./hooks";
import Cube from "./cesium/square/cube";

const SpatialIdRequester = () => {
  const {
    zoomLevel,
    currentCoord,
    handleCoordChange,
    handleChange,
    squareCoordinates,
    mode,
    toggleMode,
    cubeCoordinates,
  } = useHooks();

  return (
    <div>
      <UIContainer>
        <ZoomLevelSlider
          valueRange={[14, 18]}
          defaultValue={zoomLevel}
          onChange={handleChange}
        />
      </UIContainer>
      <MapViewer onCoordinateChange={handleCoordChange}>
        {squareCoordinates && <Square coordinate={squareCoordinates} />}
        {cubeCoordinates?.[0].map((coord, index) => (
          <Cube key={index} center={coord} dimension={cubeCoordinates[1]} />
        ))}
      </MapViewer>
    </div>
  );
};

export default SpatialIdRequester;

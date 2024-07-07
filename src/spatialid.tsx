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
    squareCoords,
    mode,
    toggleMode,
    cubeCoodinates,
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
        {squareCoords && <Square coordinate={squareCoords} />}
        {cubeCoodinates && <Cube coordinate={cubeCoodinates} />}
      </MapViewer>
    </div>
  );
};

export default SpatialIdRequester;

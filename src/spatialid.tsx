import ZoomLevelSlider from "./components/form/slider";
import { MapViewer } from "./feature/map";
import UIContainer from "./ui";
import Square from "./cesium/square/square";
import { useHooks } from "./hooks";

const SpatialIdRequester = () => {
  const {
    zoomLevel,
    currentCoord,
    handleCoordChange,
    handleChange,
    squareCoords,
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
      </MapViewer>
    </div>
  );
};

export default SpatialIdRequester;

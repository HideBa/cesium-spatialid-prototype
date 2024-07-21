import * as Cesium from "cesium";

import {
  Camera,
  CameraLookAt,
  Globe,
  ImageryLayer,
  Scene,
  ScreenSpaceEvent,
  ScreenSpaceEventHandler,
  Viewer,
} from "resium";
import Cube, { type Cube as CubeType } from "../../components/cesium/cube";
import Square from "../../components/cesium/square";
import { useHooks, type SelectionMode as SelectionModeType } from "./hooks";
import { Tileset } from "../../components/cesium/tileset";

export type SelectionMode = SelectionModeType;

export type MapViewerProps = {
  defaultCameraPosition?: [number, number, number];
  defaultCameraOffset?: [number, number, number];
  onCoordinateChange: (coord: [number, number]) => void;
  onCubeSelect?: (id: string) => void;
  cubeId?: string;
  mode: SelectionMode;
  squareCoordinates?: [number, number, number, number];
  cubes?: CubeType[];
  isSyncZoomLevel?: boolean;
  onZoomLevelChange?: (value: number) => void;
};

export const MapViewer = ({
  defaultCameraPosition,
  defaultCameraOffset,
  onCoordinateChange,
  onCubeSelect,
  cubeId,
  mode,
  squareCoordinates,
  cubes,
  isSyncZoomLevel,
  onZoomLevelChange,
}: MapViewerProps) => {
  const {
    cameraPosition,
    cameraOffset,
    handleMouseClick,
    ref,
    handleCameraChange,
  } = useHooks({
    onCoordinateChange,
    onCubeSelect,
    cubeId,
    squareCoordinates,
    cubes,
    mode,
    defaultCameraPosition,
    defaultCameraOffset,
    isSyncZoomLevel,
    onZoomLevelChange,
  });
  return (
    <Viewer
      full
      ref={ref}
      timeline={false}
      animation={false}
      homeButton={false}
      baseLayerPicker={false}
      navigationHelpButton={false}
      sceneModePicker={false}
    >
      <Scene />
      <Globe show={true} />
      {cameraPosition && cameraOffset && (
        <CameraLookAt target={cameraPosition} offset={cameraOffset} once />
      )}
      <Camera onChange={handleCameraChange} percentageChanged={0.2} />
      <ImageryLayer
        imageryProvider={
          new Cesium.UrlTemplateImageryProvider({
            url: "https://tiles.plateau.reearth.io/light-map/{z}/{x}/{y}.png",
            minimumLevel: 0,
            maximumLevel: 18,
            tileWidth: 256,
            tileHeight: 256,
          })
        }
      />

      {mode === "square" && squareCoordinates && (
        <Square coordinate={squareCoordinates} alpha={0.5} color="#00bebe" />
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
            alpha={0.3}
          />
        ))}
      <Tileset url="https://assets.cms.plateau.reearth.io/assets/db/070026-aa27-431b-8d53-7cc6b03244f8/13101_chiyoda-ku_pref_2023_citygml_1_op_bldg_3dtiles_13101_chiyoda-ku_lod2_no_texture/tileset.json" />
      <ScreenSpaceEventHandler useDefault>
        <ScreenSpaceEvent
          type={Cesium.ScreenSpaceEventType.LEFT_CLICK}
          action={handleMouseClick}
        />
        <ScreenSpaceEvent
          type={Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK}
        />
      </ScreenSpaceEventHandler>
    </Viewer>
  );
};

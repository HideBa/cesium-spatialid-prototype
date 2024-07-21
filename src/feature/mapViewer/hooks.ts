import { useCallback, useEffect, useMemo, useRef } from "react";
import { CesiumComponentRef } from "resium";
import { type Cube as CubeType } from "../../cesium/cube/cube";
import {Viewer as CesiumViewer} from "cesium";
import * as Cesium from "cesium";

export type SelectionMode = "square" | "cube";


type ScreenSpaceEventParam =
  | { position: Cesium.Cartesian2 }
  | { startPosition: Cesium.Cartesian2; endPosition: Cesium.Cartesian2 };

export const useHooks = ({  defaultCameraPosition,
  defaultCameraOffset,
  onCoordinateChange,
  onCubeSelect,
  }: {defaultCameraPosition?: [number, number, number];
    defaultCameraOffset?: [number, number, number];
  onCoordinateChange: (coord: [number, number]) => void;
  onCubeSelect?: (id: string) => void;
  cubeId?: string;
  mode: SelectionMode;
  squareCoordinates?: [number, number, number, number];
  cubes?: CubeType[];}) => {
  const ref = useRef<CesiumComponentRef<CesiumViewer>>(null);
  const heading = Cesium.Math.toRadians(50.0)
  const pitch = Cesium.Math.toRadians(-20.0);
  const range = 5000.0;
  const cameraPosition =defaultCameraPosition ?  Cesium.Cartesian3.fromDegrees(...defaultCameraPosition) :  Cesium.Cartesian3.fromDegrees(...[139.767052, 35.681167, 1000]);
  const cameraOffset = defaultCameraOffset ? new Cesium.HeadingPitchRange(...defaultCameraOffset) : new Cesium.HeadingPitchRange(...[heading, pitch, range]);


  const handlePickupEntity = useCallback(
    (entity: Cesium.Entity) => {
      if (entity.box) {
        const colorProperty = new Cesium.ColorMaterialProperty(
          new Cesium.CallbackProperty(
            () => Cesium.Color.fromCssColorString("#00bebe").withAlpha(0.5),
            false
          )
        );
        entity.box.material = colorProperty;
        onCubeSelect?.(entity.id);
      }
    },
    [onCubeSelect]
  );

  const handleCoordinateChange = useCallback(
    (cartesian3d: Cesium.Cartesian3, ellipsoid?: Cesium.Ellipsoid) => {
      const latlng_rad = Cesium.Cartographic.fromCartesian(
        cartesian3d,
        ellipsoid
      );
      const latLng_degree: [number, number] = [
        Cesium.Math.toDegrees(latlng_rad.latitude),
        Cesium.Math.toDegrees(latlng_rad.longitude),
      ];
      onCoordinateChange(latLng_degree);
    },
    [onCoordinateChange]
  );

  const handleMouseClick = useCallback(
    (click: ScreenSpaceEventParam) => {
      if (!("position" in click)) {
        return;
      }
      if (ref.current?.cesiumElement) {
        const viewer = ref.current.cesiumElement;
        const pickedObject = viewer.scene.pick(click.position);
        if (Cesium.defined(pickedObject) && pickedObject.id) {
          handlePickupEntity(pickedObject.id);
          return;
        } else {
          const cartesian3d = viewer.camera.pickEllipsoid(
            click.position,
            viewer.scene.globe.ellipsoid
          );
          if (!cartesian3d) {
            return;
          }
          handleCoordinateChange(cartesian3d, viewer.scene.globe.ellipsoid);
        }
      }
    },
    [handleCoordinateChange, handlePickupEntity]
  );


  return { ref, cameraPosition, cameraOffset, handleMouseClick };
}
import * as Cesium from "cesium";
import { Viewer as CesiumViewer } from "cesium";
import { useCallback, useEffect, useRef } from "react";
import { CesiumComponentRef, Viewer } from "resium";

export type MapViewerProps = {
  onCoordinateChange: (coord: [number, number]) => void;
  children?: React.ReactNode;
  onCubeSelect?: (id: string) => void;
  cubeId?: string;
};

export const MapViewer = ({
  onCoordinateChange,
  children,
  onCubeSelect,
  cubeId,
  cubeCoordinates,
}: MapViewerProps) => {
  const ref = useRef<CesiumComponentRef<CesiumViewer>>(null);

  useEffect(() => {
    if (ref.current && ref.current.cesiumElement) {
      const viewer = ref.current.cesiumElement;

      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
          139.767052,
          35.681167,
          10000
        ),
      });
    }
  }, []);

  const handlePickupEntity = useCallback(
    (entity: Cesium.Entity) => {
      if (entity.box) {
        entity.box.material = new Cesium.ColorMaterialProperty(
          Cesium.Color.fromCssColorString("#00bebe").withAlpha(0.5)
        );
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

  useEffect(() => {
    if (ref.current?.cesiumElement) {
      const viewer = ref.current.cesiumElement;
      viewer.screenSpaceEventHandler.setInputAction(
        (click: Cesium.ScreenSpaceEventHandler.PositionedEvent) => {
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
        },
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      );
    }

    return () => {
      if (ref.current && ref.current.cesiumElement) {
        const viewer = ref.current.cesiumElement;
        viewer.screenSpaceEventHandler.removeInputAction(
          Cesium.ScreenSpaceEventType.LEFT_CLICK
        );
      }
    };
  }, [handleCoordinateChange, handlePickupEntity, ref.current?.cesiumElement]);

  return (
    <Viewer full ref={ref}>
      {children}
    </Viewer>
  );
};

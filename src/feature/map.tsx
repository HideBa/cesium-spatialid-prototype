import * as Cesium from "cesium";
import { Viewer as CesiumViewer } from "cesium";
import { useEffect, useRef } from "react";
import { CesiumComponentRef, Viewer } from "resium";

export type MapViewerProps = {
  onCoordinateChange: (coord: [number, number]) => void;
  children?: React.ReactNode;
};

export const MapViewer = ({ onCoordinateChange, children }: MapViewerProps) => {
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
      viewer.screenSpaceEventHandler.setInputAction(
        (click: Cesium.ScreenSpaceEventHandler.PositionedEvent) => {
          const cartesian3d = viewer.camera.pickEllipsoid(
            click.position,
            viewer.scene.globe.ellipsoid
          );
          if (!cartesian3d) {
            return;
          }
          const latlng_rad = Cesium.Cartographic.fromCartesian(
            cartesian3d,
            viewer.scene.globe.ellipsoid
          );
          const latLng_degree: [number, number] = [
            Cesium.Math.toDegrees(latlng_rad.latitude),
            Cesium.Math.toDegrees(latlng_rad.longitude),
          ];
          onCoordinateChange(latLng_degree);
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
  });

  return (
    <Viewer full ref={ref}>
      {children}
    </Viewer>
  );
};

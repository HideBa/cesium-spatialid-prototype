// import { Globe, ImageryLayer, Scene, Viewer } from "resium";
import * as Cesium from "cesium";
import { useEffect, useRef } from "react";
import { Viewer } from "resium";

export const MapViewer = () => {
  const cesiumContainer = useRef<CesiumComponentRef<Viewer>>(null);
  const viewer = useRef<Cesium.Viewer | null>(null);

  Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyYTI3ZDMxOS1mODc4LTQ5NzktOGUzNy04OTA0ZGI5MmM1NGIiLCJpZCI6MjU5LCJpYXQiOjE3MTk4NDM5OTN9.FDHD-mZOIAzA9J_kzOz6AkKK2PHzl2yoMbFqbpsfH6Q";
  useEffect(() => {
    if (cesiumContainer.current) {
      viewer.current = new Cesium.Viewer(cesiumContainer.current, {});

      const xyzImageryProvider = new Cesium.UrlTemplateImageryProvider({
        url: "https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png",
        // minimumLevel: 0,
        // maximumLevel: 18,
      });

      viewer.current.imageryLayers.addImageryProvider(xyzImageryProvider);

      // Set the initial camera position (optional)
      viewer.current.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(-98.0, 40.0, 10000000.0),
      });
    }

    return () => {
      if (viewer.current) {
        viewer.current.destroy();
      }
    };
  }, []);

  return (
    <div ref={cesiumContainer} style={{ width: "100%", height: "100vh" }} />
    // <Viewer full ref={cesiumContainer} />
  );
};

// import { CoreVisualizer, Layer, MapRef } from "@reearth/core";
// import { useCallback, useRef, useState } from "react";
// import { SCENE } from "./scene";
// import { type Cube as CubeType } from "../../components/cesium/cube";
// import { useHooks } from "./hooks";

// export type SelectionMode = "square" | "cube";

// export type VisualizerProps = {
//   defaultCameraPosition?: [number, number, number];
//   onCoordinateChange: (coord: [number, number]) => void;
//   onCubeSelect?: (id: string) => void;
//   cubeId?: string;
//   mode: SelectionMode;
//   squareCoordinates?: [number, number, number, number];
//   cubes?: CubeType[];
// };

// export const Visualizer = ({
//   defaultCameraPosition,
//   onCoordinateChange,
//   onCubeSelect,
//   cubeId,
//   mode,
//   squareCoordinates,
//   cubes,
//   ...props
// }: VisualizerProps) => {
//   const ref = useRef<MapRef>(null);
//   const [isReady, setIsReady] = useState(false);
//   const handleMount = useCallback(() => {
//     requestAnimationFrame(() => {
//       setIsReady(true);
//     });
//   }, []);

//   // TODO: use onLayerSelect props (core should export a type for selection).
//   const handleSelect = useCallback(() => {
//     console.log("Selected feature: ", ref.current?.layers.selectedFeature());
//   }, []);

//   const { layers } = useHooks({ squareCoordinates, cubes });
//   console.log("layers: ", layers);
//   console.log("hello----------");
//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100vw",
//         height: "100vh",
//       }}
//     >
//       <CoreVisualizer
//         ref={ref}
//         ready={isReady}
//         onMount={handleMount}
//         onLayerSelect={handleSelect}
//         engine="cesium"
//         meta={{
//           cesiumIonAccessToken: undefined,
//         }}
//         // FIXME: Terrain isn't rendered in initial render.
//         sceneProperty={isReady ? SCENE : undefined}
//         layers={layers as Layer[]}
//       />
//     </div>
//   );
// };

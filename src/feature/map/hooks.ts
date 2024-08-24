// import { useMemo } from "react";
// import { type Cube } from "../../components/cesium/cube";

// export const useHooks = ({
//   squareCoordinates,
//   cubes,
// }: {
//   squareCoordinates?: [number, number, number, number];
//   cubes?: Cube[];
// }) => {
//   const geojsonSquare = useMemo(() => {
//     if (!squareCoordinates) return;
//     const square = {
//       type: "Feature",
//       geometry: {
//         type: "Polygon",
//         coordinates: [
//           [
//             [squareCoordinates[0], squareCoordinates[1]],
//             [squareCoordinates[0], squareCoordinates[3]],
//             [squareCoordinates[2], squareCoordinates[3]],
//             [squareCoordinates[2], squareCoordinates[1]],
//             [squareCoordinates[0], squareCoordinates[1]],
//           ],
//         ],
//       },
//     };
//     return square;
//   }, [squareCoordinates]);

//   const geojsonCubes: Layer | undefined = useMemo(() => {
//     if (!cubes) return;
//     return {
//       id: "spatialid_cubes",
//       type: "simple" as const,
//       data: {
//         type: "geojson",
//         value: {
//           type: "FeatureCollection",
//           features: cubes?.map((cube) => ({
//             type: "Feature",
//             geometry: {
//               type: "Point",
//               coordinates: cube.center,
//             },
//           })),
//         },
//       },
//     };
//   }, [cubes]);

//   const cubeStyle: BoxAppearance | undefined = useMemo(() => {
//     if (!cubes) return;
//     return {
//       height: cubes[0].dimension[0],
//       width: cubes[0].dimension[1],
//       length: cubes[0].dimension[2],
//       fillColor: "#00bebe",
//     };
//   }, [cubes]);

//   const layers = useMemo(() => {
//     return [
//       {
//         id: "spatialid_square",
//         type: "simple" as const,
//         data: {
//           type: "geojson",
//           value: geojsonSquare,
//         },
//       },
//       {
//         ...geojsonCubes,
//         appearance: cubeStyle,
//       },
//     ];
//   }, []);

//   return {
//     layers,
//   };
// };

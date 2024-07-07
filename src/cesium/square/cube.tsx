import { Entity } from "resium";
import { Cartesian3 } from "cesium";

export type CubeProps = {
  coordinate: [number, number, number, number, number, number]; //[xmin, ymin, zmin, xmax, ymax, zmax]
};

const calculateDimensionFromCartographic = (
  bbox: [number, number, number, number, number, number]
): Cartesian3 => {
  //[xmin, ymin, zmin, xmax, ymax, zmax]
  const bottomLeft = Cartesian3.fromDegrees(bbox[0], bbox[1], bbox[2]);
  const topRight = Cartesian3.fromDegrees(bbox[3], bbox[4], bbox[5]);
  const x = Math.abs(bottomLeft.x - topRight.x);
  const y = Math.abs(bottomLeft.y - topRight.y);
  const z = Math.abs(bottomLeft.z - topRight.z);
  return new Cartesian3(x, y, z);
};

const calcualteCenterFromCartographic = (
  bbox: [number, number, number, number, number, number]
): Cartesian3 => {
  //[xmin, ymin, zmin, xmax, ymax, zmax]
  const bottomLeft = Cartesian3.fromDegrees(bbox[0], bbox[1], bbox[2]);
  const dimensions = calculateDimensionFromCartographic(bbox);
  const x = bottomLeft.x + dimensions.x / 2;
  const y = bottomLeft.y + dimensions.y / 2;
  const z = bottomLeft.z + dimensions.z / 2;
  return new Cartesian3(x, y, z);
};

const Cube = ({ coordinate }: CubeProps) => {
  return (
    <Entity
      position={calcualteCenterFromCartographic(coordinate)}
      box={{
        dimensions: calculateDimensionFromCartographic(coordinate),
      }}
    />
  );
};

export default Cube;

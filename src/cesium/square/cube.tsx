import { Entity, useCesium } from "resium";
import { Cartesian3 } from "cesium";

export type CubeProps = {
  center: Cartesian3;
  dimension: Cartesian3;
};

const Cube = ({ center, dimension }: CubeProps) => {
  const { viewer } = useCesium();
  console.log("center", center);
  console.log("dimension", dimension);
  return (
    <Entity
      position={center}
      box={{
        dimensions: dimension,
      }}
    />
  );
};

export default Cube;

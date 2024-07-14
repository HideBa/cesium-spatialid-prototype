import { Entity } from "resium";
import { Cartesian3, Color } from "cesium";

export type CubeProps = {
  center: Cartesian3;
  dimension: Cartesian3;
  id: string;
  color?: string;
  alpha?: number;
};

const Cube = ({
  center,
  dimension,
  id,
  color = "#00bebe",
  alpha = 0.2,
}: CubeProps) => {
  if (alpha > 1) {
    alpha = 1;
  }
  if (alpha < 0) {
    alpha = 0;
  }

  return (
    <Entity
      id={id}
      position={center}
      box={{
        dimensions: dimension,
        material: Color.fromCssColorString(color).withAlpha(alpha),
      }}
    />
  );
};

export default Cube;

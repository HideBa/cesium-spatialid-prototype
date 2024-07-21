import { Entity } from "resium";
import { Cartesian3, Color } from "cesium";

export type CubeProps = {
  center: [number, number, number]; // lng, lat, alt
  dimension: [number, number, number]; // width, height, depth
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
      position={Cartesian3.fromDegrees(...center)}
      box={{
        dimensions: new Cartesian3(...dimension),
        material: Color.fromCssColorString(color).withAlpha(alpha),
      }}
    />
  );
};

export default Cube;

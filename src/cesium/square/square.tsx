import { Entity } from "resium";
import { Rectangle, Math, Color, ColorMaterialProperty } from "cesium";
import { useMemo } from "react";
export type SquareProps = {
  coordinate: [number, number, number, number]; // east, north, west, south in lat, lng
  color?: string;
  alpha?: number;
};

const Square = ({ coordinate, color = "#fff", alpha = 1 }: SquareProps) => {
  const coordinateRad = coordinate.map((c) => Math.toRadians(c));
  const material = useMemo(() => {
    return new ColorMaterialProperty(
      Color.fromCssColorString(color).withAlpha(alpha)
    );
  }, [color, alpha]);
  return (
    <Entity
      rectangle={{
        coordinates: new Rectangle(
          coordinateRad[0],
          coordinateRad[1],
          coordinateRad[2],
          coordinateRad[3]
        ),
        material,
      }}
    />
  );
};

export default Square;

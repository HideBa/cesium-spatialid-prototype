import { Entity } from "resium";
import { Rectangle } from "cesium";
import { Math } from "cesium";
export type SquareProps = {
  coordinate: [number, number, number, number]; // east, north, west, south in lat, lng
};

const Square = ({ coordinate }: SquareProps) => {
  const coordinateRad = coordinate.map((c) => Math.toRadians(c));

  return (
    <Entity
      rectangle={{
        coordinates: new Rectangle(
          coordinateRad[0],
          coordinateRad[1],
          coordinateRad[2],
          coordinateRad[3]
        ),
      }}
    />
  );
};

export default Square;

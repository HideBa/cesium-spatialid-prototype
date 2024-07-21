import { Cesium3DTilesetGraphics, Entity } from "resium";

export type Props = {
  url: string;
};

export const Tileset = ({ url }: Props) => {
  return (
    <Entity>
      <Cesium3DTilesetGraphics uri={url} />
    </Entity>
  );
};

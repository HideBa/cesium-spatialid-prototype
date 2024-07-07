import { styled } from "@mui/material/styles";

export type UIContainerProps = {
  children: React.ReactNode;
};

const UIContainer = ({ children }: UIContainerProps) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled("div")({
  position: "absolute",
  top: "0",
  left: "0",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export default UIContainer;

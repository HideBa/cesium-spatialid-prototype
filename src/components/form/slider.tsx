import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useEffect, useState } from "react";

export type SliderProps = {
  onChange: (zoomLevel: number) => void;
  valueRange: number[];
  defaultValue: number;
};

const ZoomLevelSlider = ({
  valueRange,
  defaultValue,
  onChange,
}: SliderProps) => {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setValue(newValue);
      onChange(newValue);
    }
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <Box sx={{ width: 200 }} m="20px">
      <Slider
        min={valueRange[0]}
        max={valueRange[1]}
        step={1}
        marks
        valueLabelDisplay="auto"
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
};

export default ZoomLevelSlider;

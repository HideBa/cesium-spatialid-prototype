import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  styled,
} from "@mui/material";
import { useCallback, useState } from "react";

export type ControllerProps = {
  zoomLevelRange: [number, number];
  zoomLevel?: number;
  onZoomLevelChange: (zoomLevel: number) => void;
  mode: string;
  modes: string[];
  onModeChange: (mode: string) => void;
};

export const Controller = ({
  zoomLevelRange,
  zoomLevel = 14,
  onZoomLevelChange,
  mode,
  modes,
  onModeChange,
}: ControllerProps) => {
  const handleZoomLevelChange = useCallback(
    (_: Event, value: number | number[]) => {
      if (typeof value !== "number") {
        return;
      }
      if (value < zoomLevelRange[0] || value > zoomLevelRange[1]) {
        return;
      }
      onZoomLevelChange(value);
    },
    [onZoomLevelChange, zoomLevelRange]
  );

  const handleChangeMode = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onModeChange(event.target.value);
    },
    [onModeChange]
  );

  return (
    <StyledStack>
      <FormControl>
        <FormLabel>Mode</FormLabel>
        <RadioGroup
          defaultValue={mode}
          onChange={handleChangeMode}
          value={mode}
          name="radio-mode"
        >
          {modes.map((mode) => (
            <FormControlLabel
              key={mode}
              value={mode}
              control={<Radio />}
              label={mode}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Box sx={{ width: 200 }} m="20px">
        <FormLabel>Zoom Level</FormLabel>
        <Slider
          min={zoomLevelRange[0]}
          max={zoomLevelRange[1]}
          step={1}
          marks
          valueLabelDisplay="auto"
          value={zoomLevel}
          onChange={handleZoomLevelChange}
        />
      </Box>
    </StyledStack>
  );
};

const StyledStack = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper, // Use theme for consistent styling
  padding: 20,
  margin: 20,
  borderRadius: 8,
}));

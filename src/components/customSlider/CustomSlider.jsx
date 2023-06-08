import React from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

const StyledSlider = styled(Slider)({
  color: "var(--color-effect)",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 15,
    width: 15,
    backgroundColor: "var(--color-secondary)",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
  },
  "& .MuiSlider-rail": {
    opacity: 0.25,
  },
});

const CustomSlider = (props) => {
  return <StyledSlider defaultValue={35} aria-label="Volume" {...props} />;
};

export default CustomSlider;

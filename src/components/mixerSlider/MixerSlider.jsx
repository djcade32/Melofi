import React from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import "./mixerSlider.css";

const StyledSlider = styled(Slider)({
  color: "var(--color-effect)",
  height: 30,

  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    height: 41,
    width: 41,
    position: "absolute",
    left: 30,
    backgroundColor: "var(--color-secondary)",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
  },
  "& .MuiSlider-rail": {
    opacity: 0.25,
    backgroundColor: "rgb(112,108,111)",
  },
});

const MixerSlider = (props) => {
  function IconThumb(iconThumbProps) {
    const { children, ...other } = iconThumbProps;
    return (
      <SliderThumb {...other}>
        {children}
        {props.icon}
      </SliderThumb>
    );
  }

  return (
    <div className="melofi__mixerSlider-container">
      <p>{props.label}</p>
      <div className="melofi__mixerSlider_slider-container">
        <StyledSlider
          slots={{
            thumb: IconThumb,
          }}
          defaultValue={0}
          aria-label={props.label}
          {...props}
          max={75}
        />
      </div>
    </div>
  );
};

export default MixerSlider;

import React, { useEffect, useRef, useState } from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import "./mixerSlider.css";
import { getIcon } from "../../helpers/icons";

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

const mixerSliderIconProps = {
  size: 30,
  color: "#232323",
};

const MixerSlider = ({ sound, soundpath, reset, setReset }) => {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    if (reset) {
      setVolume(0);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setReset(false);
    }
  }, [reset]);

  function IconThumb(iconThumbProps) {
    const { children, ...other } = iconThumbProps;
    return (
      <SliderThumb {...other}>
        {children}
        {getIcon(sound, mixerSliderIconProps)}
      </SliderThumb>
    );
  }

  const handleLevelChange = (e) => {
    if (e.target.value > 0) {
      audioRef.current.play();
    } else if (e.target.value <= 0) {
      audioRef.current.pause();
    }
    audioRef.current.volume = e.target.value / 100;
    setVolume(e.target.value);
  };

  return (
    <div className="melofi__mixerSlider-container">
      <audio ref={audioRef} src={soundpath} loop />

      <div className="melofi__mixerSlider-container-label ">
        <p>{sound}</p>
      </div>
      <div className="melofi__mixerSlider_slider-container">
        <StyledSlider
          slots={{
            thumb: IconThumb,
          }}
          defaultValue={0}
          max={75}
          onChange={handleLevelChange}
          value={volume}
        />
      </div>
    </div>
  );
};

export default MixerSlider;

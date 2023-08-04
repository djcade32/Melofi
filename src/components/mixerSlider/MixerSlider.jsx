import React, { useEffect, useRef, useState } from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import "./mixerSlider.css";
import { getIcon } from "../../helpers/icons";
import { useAppContext } from "../../context/AppContext";

const StyledSlider = styled(Slider)({
  color: "var(--color-effect)",
  height: 20,

  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    height: 30,
    width: 30,
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

const MixerSlider = ({ sound, soundpath, reset, setReset }) => {
  const { currentSceneIndex } = useAppContext();
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    if (reset) {
      resetSlider();
    }
  }, [reset]);

  useEffect(() => {
    resetSlider();
  }, [currentSceneIndex]);

  function IconThumb(iconThumbProps) {
    const { children, ...other } = iconThumbProps;
    const mixerSliderIconProps = {
      size: 20,
      color: "#232323",
    };
    return (
      <SliderThumb {...other}>
        {children}
        {getIcon(sound, mixerSliderIconProps)}
      </SliderThumb>
    );
  }

  function resetSlider() {
    setVolume(0);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setReset(false);
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
      <audio ref={audioRef} src={soundpath} typeof="audio/mpeg" loop />

      <div className="melofi__mixerSlider-container-label ">
        <p>{sound}</p>
      </div>
      <div className="melofi__mixerSlider_slider-container">
        <StyledSlider
          sx={{
            "& .MuiSlider-thumb": {
              backgroundColor: "var(--color-secondary)",
            },
          }}
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

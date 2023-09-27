import React, { useEffect, useRef, useState } from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import "./mixerSlider.css";
import { getIcon } from "../../helpers/icons";
import { useAppContext } from "../../context/AppContext";
import { SOUNDS } from "../../data/sounds";
import { FaLock } from "../../imports/icons";
import Tooltip from "../tooltip/Tooltip";

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

const MixerSlider = ({ sound, soundPath, reset, setReset, premium }) => {
  const { selectedTemplate, setSelectedTemplate, currentSceneIndex } = useAppContext();
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0);
  useEffect(() => {
    if (selectedTemplate) {
      let found = null;
      for (let i = 0; i < selectedTemplate.sounds.length; i++) {
        if (selectedTemplate.sounds[i].sound === sound) {
          found = selectedTemplate.sounds[i];
          break;
        }
      }

      if (found) {
        setVolume(found.volume);
        audioRef.current.play();
        audioRef.current.volume = found.volume / 100;
        SOUNDS[sound].soundVolume = found.volume;
      } else {
        setVolume(0);
        audioRef.current.pause();
        audioRef.current.volume = 0;
        SOUNDS[sound].soundVolume = 0;
      }
    }
  }, [selectedTemplate]);

  useEffect(() => {
    if (!selectedTemplate) {
      resetSlider();
    }
  }, [currentSceneIndex]);

  useEffect(() => {
    if (reset) {
      resetSlider();
    }
  }, [reset]);

  function IconThumb(iconThumbProps) {
    const { children, ...other } = iconThumbProps;
    const mixerSliderIconProps = {
      size: 20,
      color: "#232323",
    };
    return (
      <SliderThumb {...other}>
        {children}
        {premium ? <FaLock {...mixerSliderIconProps} /> : getIcon(sound, mixerSliderIconProps)}
      </SliderThumb>
    );
  }

  function resetSlider() {
    setVolume(0);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    SOUNDS[sound].soundVolume = 0;
    setReset(false);
    setSelectedTemplate(null);
  }

  const handleLevelChange = (e) => {
    if (e.target.value > 0) {
      audioRef.current.play();
    } else if (e.target.value <= 0) {
      audioRef.current.pause();
    }
    audioRef.current.volume = e.target.value / 100;
    SOUNDS[sound].soundVolume = e.target.value;

    setVolume(e.target.value);
    setSelectedTemplate(null);
  };

  return (
    <div className="melofi__mixerSlider-container">
      <audio ref={audioRef} src={soundPath} typeof="audio/mpeg" loop />

      <div className="melofi__mixerSlider-container-label ">
        <p>{sound}</p>
      </div>
      <div className="melofi__mixerSlider_slider-container">
        <StyledSlider
          disabled={premium}
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

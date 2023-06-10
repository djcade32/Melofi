import React, { useState, useRef } from "react";
import "./mixer.css";
import { RiSoundModuleFill } from "react-icons/ri";
import { IoVolumeOff, IoVolumeMedium } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import { Zoom } from "@mui/material";
import VolumeSlider from "../volumeSlider/VolumeSlider";
import MixerSlider from "../mixerSlider/MixerSlider";
import { BsCloudRain, BsTree } from "react-icons/bs";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import rainEffect from "../../assets/Rain.mp3";
import chatterEffect from "../../assets/Chatter.mp3";
import natureEffect from "../../assets/Nature.mp3";

const Button = React.forwardRef(function Button(props, ref) {
  //  Spread the props to the underlying DOM element.
  return (
    <div {...props} ref={ref}>
      <RiSoundModuleFill size={20} color="white" />
    </div>
  );
});

const Mixer = () => {
  const [volumeLevel, setVolumeLevel] = useState(35);
  const [rainLevel, setRainLevel] = useState(0);
  const [chatterLevel, setChatterLevel] = useState(0);
  const [natureLevel, setNatureLevel] = useState(0);
  const rainAudioEffect = useRef(null);
  const chatterAudioEffect = useRef(null);
  const natureAudioEffect = useRef(null);

  const handleRainSlider = (e) => {
    if (e.target.value > 0) {
      rainAudioEffect.current.play();
    } else if (e.target.value <= 0) {
      rainAudioEffect.current.pause();
    }
    rainAudioEffect.current.volume = e.target.value / 100;
    setRainLevel(e.target.value);
  };

  const handleChatterSlider = (e) => {
    if (e.target.value > 0) {
      chatterAudioEffect.current.play();
    } else if (e.target.value <= 0) {
      chatterAudioEffect.current.pause();
    }
    chatterAudioEffect.current.volume = e.target.value / 100;
    setChatterLevel(e.target.value);
  };

  const handleNatureSlider = (e) => {
    if (e.target.value > 0) {
      natureAudioEffect.current.play();
    } else if (e.target.value <= 0) {
      natureAudioEffect.current.pause();
    }
    natureAudioEffect.current.volume = e.target.value / 100;
    setNatureLevel(e.target.value);
  };

  const handleResetPressed = () => {
    rainAudioEffect.current.currentTime = 0;
    chatterAudioEffect.current.currentTime = 0;
    natureAudioEffect.current.currentTime = 0;

    rainAudioEffect.current.volume = 0;
    chatterAudioEffect.current.volume = 0;
    natureAudioEffect.current.volume = 0;

    setRainLevel(0);
    setChatterLevel(0);
    setNatureLevel(0);
  };

  return (
    <>
      <audio ref={rainAudioEffect} src={rainEffect} loop />
      <audio ref={chatterAudioEffect} src={chatterEffect} loop />
      <audio ref={natureAudioEffect} src={natureEffect} loop />

      <div className="melofi__mixer-button" onClick={() => {}}>
        <Tooltip title="Mixer" TransitionComponent={Zoom}>
          <Button />
        </Tooltip>
      </div>
      <div className="melofi__mixer-modal">
        <div className="melofi__mixer_header">
          <p className="melofi__mixer-title">SOUNDS</p>
          <IoCloseOutline
            size={33}
            color="var(--color-secondary)"
            onClick={() => {}}
            style={{ cursor: "pointer" }}
          />
        </div>

        <p className="melofi__mixer_volume-title">MUSIC VOLUME</p>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
          <IoVolumeOff size={33} color="var(--color-secondary)" />
          <div style={{ width: "75%" }}>
            <VolumeSlider style={{ cursor: "pointer" }} />
          </div>
          <IoVolumeMedium size={33} color="var(--color-secondary)" />
        </div>

        <div style={{ marginTop: 25 }}>
          <MixerSlider
            style={{ cursor: "pointer" }}
            label="Rain"
            icon={<BsCloudRain size={30} color="#232323" />}
            onChange={handleRainSlider}
            value={rainLevel}
          />
          <MixerSlider
            style={{ cursor: "pointer" }}
            label="Chatter"
            icon={<HiOutlineChatBubbleLeftRight size={30} color="#232323" />}
            onChange={handleChatterSlider}
            value={chatterLevel}
          />
          <MixerSlider
            style={{ cursor: "pointer" }}
            label="Nature"
            icon={<BsTree size={30} color="#232323" />}
            onChange={handleNatureSlider}
            value={natureLevel}
          />
        </div>
        <p className="melofi__mixer_reset-button" onClick={handleResetPressed}>
          Reset
        </p>
      </div>
    </>
  );
};

export default Mixer;

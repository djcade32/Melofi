import React, { useState, useRef } from "react";
import "./mixer.css";
import { rainEffect, chatterEffect, natureEffect } from "../../imports/effects";
import {
  RiSoundModuleFill,
  IoVolumeOff,
  IoVolumeMedium,
  BsCloudRain,
  BsTree,
  HiOutlineChatBubbleLeftRight,
  IoCloseOutline,
} from "../../imports/icons";

import Draggable from "react-draggable";
import VolumeSlider from "../volumeSlider/VolumeSlider";
import MixerSlider from "../mixerSlider/MixerSlider";
import { useAppContext } from "../../context/AppContext";
import Tooltip from "../tooltip/Tooltip";

const mixerSliderIconProps = {
  size: 30,
  color: "#232323",
};

const Mixer = () => {
  const nodeRef = React.useRef(null);
  const { musicVolume, setMusicVolume } = useAppContext();

  const [showMixer, setShowMixer] = useState(false);
  const [rainLevel, setRainLevel] = useState(0);
  const [chatterLevel, setChatterLevel] = useState(0);
  const [natureLevel, setNatureLevel] = useState(0);
  const rainAudioEffect = useRef(null);
  const chatterAudioEffect = useRef(null);
  const natureAudioEffect = useRef(null);

  const handleVolumeChange = (e) => {
    setMusicVolume(e.target.value);
  };

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

      <div className="melofi__mixer-button" onClick={() => setShowMixer((prev) => !prev)}>
        <Tooltip text="Mixer">
          <RiSoundModuleFill size={20} color="white" style={{ cursor: "pointer" }} />
        </Tooltip>
      </div>

      <Draggable nodeRef={nodeRef} bounds={"div"} handle="#handle">
        <div
          ref={nodeRef}
          className={showMixer ? "melofi__mixer-modal " : "melofi__mixer-modal "}
          style={{
            display: showMixer ? "block" : "none",
          }}
        >
          <div id="handle" className="melofi__mixer-modal-handle" />

          <div className="melofi__mixer_header">
            <p className="melofi__mixer-title">SOUNDS</p>
            <IoCloseOutline
              size={33}
              color="var(--color-secondary)"
              onClick={() => setShowMixer((prev) => !prev)}
              style={{ cursor: "pointer" }}
            />
          </div>

          <p className="melofi__mixer_volume-title">MUSIC VOLUME</p>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
            <IoVolumeOff size={33} color="var(--color-secondary)" />
            <div style={{ width: "75%" }}>
              <VolumeSlider
                style={{ cursor: "pointer" }}
                value={musicVolume}
                onChange={handleVolumeChange}
              />
            </div>
            <IoVolumeMedium size={33} color="var(--color-secondary)" />
          </div>

          <div style={{ marginTop: 25 }}>
            <MixerSlider
              style={{ cursor: "pointer" }}
              label="Rain"
              icon={<BsCloudRain {...mixerSliderIconProps} />}
              onChange={handleRainSlider}
              value={rainLevel}
            />
            <MixerSlider
              style={{ cursor: "pointer" }}
              label="Chatter"
              icon={<HiOutlineChatBubbleLeftRight {...mixerSliderIconProps} />}
              onChange={handleChatterSlider}
              value={chatterLevel}
            />
            <MixerSlider
              style={{ cursor: "pointer" }}
              label="Nature"
              icon={<BsTree {...mixerSliderIconProps} />}
              onChange={handleNatureSlider}
              value={natureLevel}
            />
          </div>
          <p className="melofi__mixer_reset-button" onClick={handleResetPressed}>
            Reset
          </p>
        </div>
      </Draggable>
    </>
  );
};

export default Mixer;

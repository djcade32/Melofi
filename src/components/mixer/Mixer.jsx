import React, { useState } from "react";
import "./mixer.css";

import {
  RiSoundModuleFill,
  IoVolumeOff,
  IoVolumeMedium,
  IoCloseOutline,
} from "../../imports/icons";

import Draggable from "react-draggable";
import VolumeSlider from "../volumeSlider/VolumeSlider";
import MixerSlider from "../mixerSlider/MixerSlider";
import { useAppContext } from "../../context/AppContext";
import Tooltip from "../tooltip/Tooltip";

const Mixer = () => {
  const nodeRef = React.useRef(null);
  const { musicVolume, setMusicVolume, getCurrentScene } = useAppContext();

  const [showMixer, setShowMixer] = useState(false);
  const [resetVolume, setResetVolume] = useState(false);

  const handleVolumeChange = (e) => {
    setMusicVolume(e.target.value);
  };

  const handleResetPressed = () => {
    setResetVolume(true);
  };

  return (
    <>
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

          <div style={{ marginTop: 20 }}>
            {getCurrentScene().sounds.map(({ sound, soundPath }) => {
              return (
                <MixerSlider
                  key={sound}
                  style={{ cursor: "pointer" }}
                  soundpath={soundPath}
                  sound={sound}
                  reset={resetVolume}
                  setReset={setResetVolume}
                />
              );
            })}
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

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
import { sounds } from "../../data/sounds";

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

  const getOtherSounds = () => {
    const currSceneSounds = getCurrentScene().sounds;
    const allSounds = sounds;
    let allSoundsList = [];

    for (let i = 0; i < allSounds.length; i++) {
      const currAllSounds = allSounds[i];
      let found = false;
      let j = 0;
      while (j < currSceneSounds.length) {
        const currSound = currSceneSounds[j].sound;
        if (currSound !== currAllSounds.sound) {
          j++;
        } else {
          found = true;
          break;
        }
      }
      if (!found) {
        allSoundsList.push(currAllSounds);
      }
    }

    return allSoundsList;
  };

  return (
    <>
      <div
        className="melofi__mixer-button"
        onClick={() => setShowMixer((prev) => !prev)}
        style={showMixer ? { outline: "1px solid rgba(254, 165, 57, 0.88)" } : {}}
      >
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

          <p className="melofi__mixer_volume-title" style={{ marginTop: 20 }}>
            SCENE SOUNDS
          </p>
          <div>
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
          <p className="melofi__mixer_volume-title" style={{ marginTop: 20 }}>
            ALL SOUNDS
          </p>
          <div>
            {getOtherSounds().map(({ sound, soundPath }) => {
              console.log();
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

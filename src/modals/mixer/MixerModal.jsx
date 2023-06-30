import React, { useRef, useState } from "react";
import "./mixerModal.css";
import Draggable from "react-draggable";
import { useAppContext } from "../../context/AppContext";
import VolumeSlider from "../../components/volumeSlider/VolumeSlider";
import MixerSlider from "../../components/mixerSlider/MixerSlider";
import { sounds } from "../../data/sounds";

import { IoVolumeOff, IoVolumeMedium, IoCloseOutline } from "../../imports/icons";
import { isSafariBrowser } from "../../helpers/browser";

const MixerModal = () => {
  const nodeRef = useRef(null);
  const { musicVolume, setMusicVolume, getCurrentScene, setShowMixerModal, showMixerModal } =
    useAppContext();

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
    <Draggable nodeRef={nodeRef} bounds={isSafariBrowser() ? "" : ".fullscreen"} handle="#handle">
      <div
        ref={nodeRef}
        className="melofi__mixerModal"
        style={{
          display: showMixerModal ? "block" : "none",
        }}
      >
        <div id="handle" className="melofi__mixer-modal-handle" />

        <div id="handle" className="melofi__mixer_header">
          <p className="melofi__mixer-title">SOUNDS</p>
          <IoCloseOutline
            size={33}
            color="var(--color-secondary)"
            onClick={() => setShowMixerModal((prev) => !prev)}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div
          style={{
            overflow: "scroll",
            display: "flex",
            flexDirection: "column",
            height: "82%",
            marginTop: 10,
          }}
        >
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
      </div>
    </Draggable>
  );
};

export default MixerModal;

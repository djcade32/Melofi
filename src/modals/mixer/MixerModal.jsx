import React, { useRef, useState } from "react";
import "./mixerModal.css";
import Draggable from "react-draggable";
import { useAppContext } from "../../context/AppContext";
import VolumeSlider from "../../components/volumeSlider/VolumeSlider";
import MixerSlider from "../../components/mixerSlider/MixerSlider";
import { sounds } from "../../data/sounds";

import {
  IoVolumeOff,
  IoVolumeMedium,
  IoCloseOutline,
  BsSpotify,
  BsInfoCircle,
} from "../../imports/icons";
import { isSafariBrowser } from "../../helpers/browser";
import melofiLogo from "../../assets/logo-white.png";
import Tooltip from "../../components/tooltip/Tooltip";

const MixerModal = () => {
  const nodeRef = useRef(null);
  const {
    musicVolume,
    setMusicVolume,
    getCurrentScene,
    setShowMixerModal,
    showMixerModal,
    setUsingSpotify,
    usingSpotify,
  } = useAppContext();

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
        className="--widget-container melofi__mixerModal"
        style={{
          display: showMixerModal ? "block" : "none",
          height: 530,
        }}
      >
        <div id="handle" className="melofi__mixer-modal-handle" />

        <div id="handle" className="melofi__mixer_header">
          <p className="melofi__mixer-title">SOUNDS</p>
          <IoCloseOutline
            size={25}
            color="var(--color-secondary)"
            onClick={() => setShowMixerModal((prev) => !prev)}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="melofi__mixer_content">
          <div className="melofi__mixer_source_container">
            <div
              className="melofi__mixer_source"
              style={!usingSpotify ? { outline: "1px solid var(--color-effect-opacity)" } : {}}
              onClick={() => {
                setUsingSpotify(false);
              }}
            >
              <img src={melofiLogo} alt="melofi" width={40} />
              <p className="melofi__mixer_source_text">Melofi</p>
            </div>
            <div
              id="spotify_source"
              className="melofi__mixer_source"
              style={usingSpotify ? { outline: "1px solid var(--color-effect-opacity)" } : {}}
              onClick={() => {
                setUsingSpotify(true);
              }}
            >
              <BsSpotify color="white" size={25} />
              <p className="melofi__mixer_source_text">Spotify</p>
              <div className="melofi__mixer_source_spotify_info">
                <Tooltip text="Log into Spotify from your browser to listen without limits">
                  <BsInfoCircle size={10} color="white" />
                </Tooltip>
              </div>
            </div>
          </div>
          {usingSpotify ? (
            <div>
              <iframe
                src="https://open.spotify.com/embed/playlist/6JMt2yxWecgTXAzkDW0TrZ?utm_source=generator"
                allowFullScreen=""
                allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture;"
                className="melofi__mixer_source_spotify_widget"
                loading="lazy"
              ></iframe>
            </div>
          ) : (
            <div>
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
            </div>
          )}
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

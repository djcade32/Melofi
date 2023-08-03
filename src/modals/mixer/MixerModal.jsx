import React, { useEffect, useRef, useState } from "react";
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
  PiMaskHappyFill,
  PiMoonFill,
  FaHeadphones,
} from "../../imports/icons";
import { isSafariBrowser } from "../../helpers/browser";
import melofiLogo from "../../assets/logo-white.png";
import Tooltip from "../../components/tooltip/Tooltip";
import usePremiumStatus from "../../../stripe/usePremiumStatus";
import { useAuthContext } from "../../context/AuthContext";
import MixerPlaylistButton from "../../components/mixerPlaylistButton/MixerPlaylistButton";
import { createCheckoutSession } from "../../../stripe/createCheckoutSession";
import playlist from "../../data/playlist";

const playlistIconConfig = {
  size: 30,
  color: "var(--color-secondary)",
};

const MixerModal = () => {
  const nodeRef = useRef(null);
  const goRef = useRef(null);
  const { user } = useAuthContext();
  const {
    musicVolume,
    setMusicVolume,
    getCurrentScene,
    setShowMixerModal,
    showMixerModal,
    setUsingSpotify,
    usingSpotify,
    setSelectedPlaylist,
    selectedPlaylist,
  } = useAppContext();
  const userIsPremium = usePremiumStatus(user);

  const [resetVolume, setResetVolume] = useState(false);
  const [spotifyPlaylistInput, setSpotifyPlaylistInput] = useState("");
  const [melofiPlaylist, setMelofiPlaylist] = useState(playlist[0]);

  useEffect(() => {
    if (usingSpotify && userIsPremium) {
      const handleEnter = (event) => {
        if (event.key === "Enter") {
          goRef.current.click();
        }
      };
      document
        .getElementById("spotifyPlaylistInput")
        .addEventListener("keydown", handleEnter, true);
    }
  }, [usingSpotify]);

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

  const handleSpotifyPlaylistChange = () => {
    if (spotifyPlaylistInput === "") {
      return;
    }
    const id = extractSpotifyPlaylistId(spotifyPlaylistInput);
    if (id && id !== "") {
      setSpotifyPlaylistId(id);
      setSpotifyPlaylistInput("");
    }
  };

  const extractSpotifyPlaylistId = (spotifyPlaylistLink) => {
    const url = spotifyPlaylistLink;
    const regex = /(?:playlist\/)?([^/?]+)(?:\?.*)?$/;
    const result = regex.exec(url);

    if (result && result.length > 1 && result[0].includes("playlist")) {
      const extractedValue = result[1];
      return extractedValue;
    } else {
      return "";
    }
  };

  const handlePlaylistChange = (label) => {
    const foundPlaylist = playlist.find((list) => list.label === label);
    setMelofiPlaylist(foundPlaylist);
    setSelectedPlaylist(foundPlaylist);
  };

  return (
    <Draggable nodeRef={nodeRef} bounds={isSafariBrowser() ? "" : ".fullscreen"} handle="#handle">
      <div
        ref={nodeRef}
        className="--widget-container melofi__mixerModal"
        style={{
          display: showMixerModal ? "block" : "none",
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
          <div style={{ position: "relative" }}>
            {!userIsPremium && (
              <div className="melofi__mixer_premium_banner">
                <div
                  className="melofi__premium_button"
                  onClick={() => createCheckoutSession(user.uid)}
                >
                  <p>Go Premium</p>
                </div>
                <p style={{ width: "65%", textAlign: "center", fontSize: 14, lineHeight: 1.75 }}>
                  to change playlist based on your mood.
                </p>
              </div>
            )}
            <div className="melofi__mixer_playlist_container">
              <div className="melofi__mixer_playlist_options_container">
                {playlist.map((list, index) => (
                  <MixerPlaylistButton
                    key={list.label + index}
                    icon={list.icon}
                    label={list.label}
                    isSelected={list.label === melofiPlaylist.label}
                    onSelect={handlePlaylistChange}
                  />
                ))}
              </div>
            </div>
          </div>
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
                  <BsInfoCircle size={15} color="white" />
                </Tooltip>
              </div>
            </div>
          </div>
          {usingSpotify ? (
            <div style={{ display: "flex", flexDirection: "column", marginTop: 15 }}>
              {userIsPremium && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <input
                    id="spotifyPlaylistInput"
                    className="melofi__mixer_source_spotify_playlist_input"
                    type="text"
                    placeholder=" Enter Spotify playlist link"
                    value={spotifyPlaylistInput}
                    onChange={(e) => setSpotifyPlaylistInput(e.target.value)}
                  />
                  <p
                    ref={goRef}
                    className="melofi__mixer_source_spotify_playlist_input_button"
                    onClick={handleSpotifyPlaylistChange}
                  >
                    Go
                  </p>
                </div>
              )}

              <iframe
                src={`https://open.spotify.com/embed/playlist/${melofiPlaylist.spotifyPlaylistId}?utm_source=generator`}
                allowFullScreen=""
                allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture;"
                className="melofi__mixer_source_spotify_widget"
                loading="lazy"
              ></iframe>
            </div>
          ) : (
            <div>
              <p className="melofi__mixer_section_title" style={{ marginTop: 15 }}>
                MUSIC VOLUME
              </p>
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
          <p className="melofi__mixer_section_title " style={{ marginTop: 20 }}>
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
          <p className="melofi__mixer_section_title " style={{ marginTop: 20 }}>
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

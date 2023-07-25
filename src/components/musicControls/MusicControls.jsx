import React, { useRef, useState, useEffect } from "react";
import {
  BsFillSkipBackwardFill,
  FaPause,
  FaPlay,
  BsSkipForwardFill,
  IoVolumeMedium,
  IoVolumeMute,
} from "../../imports/icons";
import "./musicControls.css";

import VolumeSlider from "../volumeSlider/VolumeSlider";
import { useAppContext } from "../../context/AppContext";
import Tooltip from "../tooltip/Tooltip";

const iconProps = {
  size: 20,
  color: "white",
  style: { cursor: "pointer" },
};

const MusicControls = () => {
  const audioRef = useRef(null);
  const volumeContainerRef = useRef(null);
  const { musicVolume, setMusicVolume, setCurrentSongInfo, shuffledSongList } = useAppContext();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volumePressed, setVolumePressed] = useState(false);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);

  useEffect(() => {
    const songInfo = {
      title: shuffledSongList[currentMusicIndex].title,
      artist: shuffledSongList[currentMusicIndex].artist,
      provider: shuffledSongList[currentMusicIndex].provider,
      providerUrl: shuffledSongList[currentMusicIndex].providerUrl,
    };

    setCurrentSongInfo(songInfo);
    if (songInfo !== null && isPlaying) {
      audioRef.current.play();
    }
  }, [currentMusicIndex]);

  useEffect(() => {
    audioRef.current.volume = musicVolume / 100;
  }, [musicVolume]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (volumeContainerRef.current && !volumeContainerRef.current.contains(event.target)) {
        setVolumePressed(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  // Event handler for toggling play/pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const handleSkipForward = () => {
    if (currentMusicIndex === shuffledSongList.length - 1) {
      setCurrentMusicIndex(0);
      return;
    } else {
      setCurrentMusicIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleSkipBackward = () => {
    if (currentMusicIndex === 0) {
      setCurrentMusicIndex(shuffledSongList.length - 1);
    } else {
      setCurrentMusicIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleVolumeChange = (e) => {
    setMusicVolume(e.target.value);
  };

  const handleMuteAll = () => {
    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach((audio) => {
      audio.muted = !isMuted;
    });
    setIsMuted(!isMuted);
  };

  return (
    <div
      ref={volumeContainerRef}
      className="melofi__musicControls-container"
      style={
        volumePressed
          ? {
              animation: "unround-corners 200ms forwards",
              boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.25)",
            }
          : { borderRadius: "10px" }
      }
    >
      {shuffledSongList && (
        <audio
          ref={audioRef}
          src={shuffledSongList[currentMusicIndex].mp3Path}
          onEnded={handleSkipForward}
          typeof="audio/mpeg"
        />
      )}
      <div className="melofi__musicControls-buttons">
        <BsFillSkipBackwardFill {...iconProps} onClick={handleSkipBackward} />
        {isPlaying ? (
          <FaPause {...iconProps} onClick={handleTogglePlay} />
        ) : (
          <FaPlay size={20} color="white" onClick={handleTogglePlay} {...iconProps} />
        )}
        <BsSkipForwardFill {...iconProps} onClick={handleSkipForward} />
        <IoVolumeMedium {...iconProps} onClick={() => setVolumePressed((prev) => !prev)} />
        <Tooltip text={isMuted ? "Unmute all" : "Mute all"}>
          <IoVolumeMute
            size={iconProps.size}
            color={isMuted ? "var(--color-effect)" : "white"}
            onClick={handleMuteAll}
            style={iconProps.style}
          />
        </Tooltip>
      </div>

      {volumePressed && (
        <div className="melofi__musicControls_volume-slider">
          <div style={{ width: "75%" }}>
            <VolumeSlider
              style={{ cursor: "pointer" }}
              onChange={handleVolumeChange}
              value={musicVolume}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicControls;

import React, { useRef, useState, useEffect } from "react";
import {
  BsFillSkipBackwardFill,
  FaPause,
  FaPlay,
  BsSkipForwardFill,
  IoVolumeMedium,
  IoVolumeMute,
} from "./imports";
import "./musicControls.css";

import VolumeSlider from "../volumeSlider/VolumeSlider";
import { useAppContext } from "../../context/AppContext";
import Tooltip from "../tooltip/Tooltip";
import { items as songs } from "../../data/songs";
import axios from "axios";

const MusicControls = () => {
  const audioRef = useRef(null);
  const volumeContainerRef = useRef(null);
  const { musicVolume, setMusicVolume, setCurrentSongInfo } = useAppContext();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volumePressed, setVolumePressed] = useState(false);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(
    Math.floor(Math.random() * songs.length)
  );
  // Math.floor(Math.random() * songs.length)
  // useEffect(() => {
  //   async function fetchMusic() {
  //     let item = null;
  //     let songInfo = null;

  //     try {
  //       // const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
  //       //   params: {
  //       //     part: "snippet",
  //       //     q: songs[currentMusicIndex].artist + " " + songs[currentMusicIndex].title,
  //       //     // q: "allem iversom the ridge",
  //       //     type: "video",
  //       //     maxResults: 5,
  //       //     key: "AIzaSyD_G5VYrBQoSz6lvx-tHJ4-Yt_fYbPJ35U",
  //       //   },
  //       // });
  //       const response = await fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=allem&type=video&key=AIzaSyD_G5VYrBQoSz6lvx-tHJ4-Yt_fYbPJ35U");
  //       const jsonData = await response.json();
  //       setData(jsonData);

  //       item = response.data.items[0];
  //       songInfo = {
  //         title: songs[currentMusicIndex].title,
  //         artist: songs[currentMusicIndex].artist,
  //         provider: item.snippet.channelTitle,
  //         providerUrl: `https://www.youtube.com/channel/${item.snippet.channelId}`,
  //       };
  //     } catch (error) {
  //       console.error("Error retrieving music:", error);
  //       songInfo = {
  //         title: songs[currentMusicIndex].title,
  //         artist: songs[currentMusicIndex].artist,
  //         provider: "",
  //         providerUrl: "",
  //       };
  //     } finally {
  //       setCurrentSongInfo(songInfo);
  //     }
  //   }
  //   fetchMusic();
  // }, [currentMusicIndex]);

  useEffect(() => {
    const songInfo = {
      title: songs[currentMusicIndex].title,
      artist: songs[currentMusicIndex].artist,
      provider: songs[currentMusicIndex].provider,
      providerUrl: songs[currentMusicIndex].providerUrl,
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
    if (currentMusicIndex === songs.length - 1) {
      setCurrentMusicIndex(0);
      return;
    } else {
      setCurrentMusicIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleSkipBackward = () => {
    if (currentMusicIndex === 0) {
      setCurrentMusicIndex(songs.length - 1);
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
      <audio ref={audioRef} src={songs[currentMusicIndex].mp3Path} onEnded={handleSkipForward} />
      <div className="melofi__musicControls-buttons">
        <BsFillSkipBackwardFill
          size={20}
          color="white"
          onClick={handleSkipBackward}
          style={{ cursor: "pointer" }}
        />
        {isPlaying ? (
          <FaPause
            size={20}
            color="white"
            onClick={handleTogglePlay}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <FaPlay
            size={20}
            color="white"
            onClick={handleTogglePlay}
            style={{ cursor: "pointer" }}
          />
        )}
        <BsSkipForwardFill
          size={20}
          color="white"
          onClick={handleSkipForward}
          style={{ cursor: "pointer" }}
        />
        <IoVolumeMedium
          size={20}
          color="white"
          onClick={() => setVolumePressed((prev) => !prev)}
          style={{ cursor: "pointer" }}
        />
        <Tooltip text="Mute all">
          <IoVolumeMute
            size={20}
            color={isMuted ? "var(--color-effect)" : "white"}
            onClick={handleMuteAll}
            style={{ cursor: "pointer" }}
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

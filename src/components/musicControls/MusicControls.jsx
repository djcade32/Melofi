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
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthContext } from "../../context/AuthContext";

const iconProps = {
  size: 20,
  color: "white",
  style: { cursor: "pointer" },
};

const MusicControls = () => {
  const audioRef = useRef(null);
  const volumeContainerRef = useRef(null);
  const { db, user } = useAuthContext();
  const { musicVolume, setMusicVolume, setCurrentSongInfo, shuffledSongList, setNewAchievements } =
    useAppContext();

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
      if (user !== null) {
        updateZenMasterAchievement();
      }
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

  const updateZenMasterAchievement = async () => {
    const docRef = doc(db, `users/${user.uid}`);
    const userSnapshot = await getDoc(docRef);
    if (userSnapshot.exists()) {
      const newData = userSnapshot.data().achievementsProgress.zenMaster + 1;
      let userData = {
        achievementsProgress: {
          ...userSnapshot.data().achievementsProgress,
          zenMaster: newData,
        },
      };
      if (!userSnapshot.data().achievements.includes("zenMaster") && newData >= 50) {
        userData.achievements = [...userSnapshot.data().achievements, "zenMaster"];
        setNewAchievements((prev) => [...prev, "zenMaster"]);
      }
      try {
        await updateDoc(docRef, userData);
      } catch (error) {
        console.log("Error updating user lastLoginAt: ", error);
      }
    }
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

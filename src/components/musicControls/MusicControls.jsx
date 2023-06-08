import React, { useRef, useState } from "react";
import {
  BsFillSkipBackwardFill,
  FaPause,
  FaPlay,
  BsSkipForwardFill,
  IoVolumeMedium,
  IoVolumeMute,
} from "./imports";
import "./musicControls.css";

import song1 from "../../assets/Allem_Iversom_The_Ridge_(getmp3.pro).mp3";
import CustomSlider from "../customSlider/CustomSlider";

const MusicControls = () => {
  const audioRef = useRef(null); // Ref for accessing the audio element
  const [isPlaying, setIsPlaying] = useState(false); // State for tracking playback state
  const [volumePressed, setVolumePressed] = useState(false);

  // Event handler for toggling play/pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipForward = () => {
    // Logic for skipping forward
  };

  const handleSkipBackward = () => {
    // Logic for skipping backward
  };

  const handleToggleMute = () => {
    this.setState({ isMuted: !this.state.isMuted });
  };

  // const handleVolumeChange = (event) => {

  //   audioRef.current.
  // };

  return (
    <div
      className="melofi__musicControls-container"
      style={
        volumePressed ? { animation: "unround-corners 200ms forwards" } : { borderRadius: "10px" }
      }
    >
      <audio ref={audioRef} src={song1} />
      <div className="melofi__musicControls-buttons">
        <BsFillSkipBackwardFill
          size={20}
          color="white"
          onClick={() => {}}
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
          onClick={() => {}}
          style={{ cursor: "pointer" }}
        />
        <IoVolumeMedium
          size={20}
          color="white"
          onClick={() => setVolumePressed((prev) => !prev)}
          style={{ cursor: "pointer" }}
        />
        <IoVolumeMute size={20} color="white" onClick={() => {}} style={{ cursor: "pointer" }} />
      </div>

      {volumePressed && (
        <div className="melofi__musicControls_volume-slider">
          <div style={{ width: "75%" }}>
            <CustomSlider style={{ cursor: "pointer" }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicControls;

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

const MusicControls = () => {
  const audioRef = useRef(null); // Ref for accessing the audio element
  const [isPlaying, setIsPlaying] = useState(false); // State for tracking playback state

  // Event handler for toggling play/pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src={song1} />
      <div className="melofi__musicControls">
        <BsFillSkipBackwardFill size={20} color="white" onClick={() => {}} />
        {isPlaying ? (
          <FaPause size={20} color="white" onClick={handleTogglePlay} />
        ) : (
          <FaPlay size={20} color="white" onClick={handleTogglePlay} />
        )}
        <BsSkipForwardFill size={20} color="white" onClick={() => {}} />
        <IoVolumeMedium size={20} color="white" onClick={() => {}} />
        <IoVolumeMute size={20} color="white" onClick={() => {}} />
      </div>
    </>
  );
};

export default MusicControls;

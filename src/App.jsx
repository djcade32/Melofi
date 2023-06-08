import React, { useState, useRef } from "react";
import song1 from "./assets/Allem_Iversom_The_Ridge_(getmp3.pro).mp3";
import videoBg from "./assets/Girl_In_Cafe_Bg.mp4";
import "./App.css";

import { FaPlay, FaPause } from "react-icons/fa";
import { BsFillSkipBackwardFill, BsSkipForwardFill } from "react-icons/bs";
import { IoVolumeMedium, IoVolumeMute } from "react-icons/io5";

function App() {
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
    <div className="App">
      <video className="background-video" autoPlay loop muted playsInline>
        <source src={videoBg} type="video/mp4" width={"100%"} height={"100%"} />
      </video>
      <audio ref={audioRef} src={song1} />
      <div>
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
    </div>
  );
}

export default App;

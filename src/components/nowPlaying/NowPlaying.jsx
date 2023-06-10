import React from "react";
import "./nowPlaying.css";

const NowPlaying = ({ text }) => {
  return (
    <div className="melofi__nowPlaying-container">
      <div>
        <p>Now Playing</p>
      </div>
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default NowPlaying;

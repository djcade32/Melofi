import React, { useEffect } from "react";
import "./nowPlaying.css";
import { useAppContext } from "../../context/AppContext";

const NowPlaying = () => {
  const { currentSongInfo } = useAppContext();

  return (
    <>
      {currentSongInfo && (
        <div className="melofi__nowPlaying-container">
          <div style={{ marginBottom: 3 }}>
            <p className="melofi__nowPlaying-header">Now Playing</p>
          </div>
          <div style={{ marginBottom: 3 }}>
            <p className="melofi__nowPlaying-song">{`${currentSongInfo.title} by ${currentSongInfo.artist}`}</p>
          </div>
          <div>
            <p className="melofi__nowPlaying-provider">
              Provided by{" "}
              <span style={{ fontWeight: 700 }}>
                <a href={currentSongInfo.providerUrl} target="_blank">
                  {currentSongInfo.provider}
                </a>
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default NowPlaying;

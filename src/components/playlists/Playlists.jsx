import React from "react";
import "./playlists.css";
import { items as songs } from "../../data/songs";

const Playlists = () => {
  console.log("songs: ", songs.length);
  return (
    <div className="melofi__playlists">
      {songs.map((song) => (
        <div className="melofi__playlists_item" key={song.id}>
          <p style={{ color: "var(--color-secondary)", width: "4ch", fontSize: 18 }}>
            {song.id + 1}
          </p>
          <p className="melofi__playlists_item_info">{` ${song.title} - ${song.artist}`}</p>
        </div>
      ))}
    </div>
  );
};

export default Playlists;

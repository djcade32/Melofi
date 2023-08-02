import React from "react";
import "./mixerPlaylistButton.css";

const MixerPlaylistButton = ({
  icon,
  label,
  isSelected,
  onSelect,
  setSpotifyPlaylistId,
  spotifyPlaylistId,
}) => {
  const handleSelected = () => {
    // onSelect(label);
    setSpotifyPlaylistId(spotifyPlaylistId);
  };
  return (
    <div className="melofi__playlistButton" onClick={handleSelected}>
      <div
        className="melofi__playlistButton_icon"
        style={{ outline: isSelected && "1px solid var(--color-effect)" }}
      >
        {icon}
      </div>
      <p
        style={{
          textAlign: "center",
        }}
      >
        {label}
      </p>
    </div>
  );
};

export default MixerPlaylistButton;

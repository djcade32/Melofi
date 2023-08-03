import React from "react";
import "./mixerPlaylistButton.css";

const MixerPlaylistButton = ({ icon, label, isSelected, onSelect }) => {
  const handleSelected = () => {
    onSelect(label);
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

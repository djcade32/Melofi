import React from "react";
import "./mixerPlaylistButton.css";
import { useAppContext } from "../../context/AppContext";

const MixerPlaylistButton = ({ icon, label, isSelected, onSelect }) => {
  const { setSelectedTemplate, selectedTemplate } = useAppContext();
  const handleSelected = () => {
    onSelect(label);
    if (selectedTemplate) {
      setSelectedTemplate(null);
    }
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

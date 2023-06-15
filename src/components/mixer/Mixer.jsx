import React, { useEffect } from "react";
import "./mixer.css";

import { RiSoundModuleFill } from "../../imports/icons";

import { useAppContext } from "../../context/AppContext";
import Tooltip from "../tooltip/Tooltip";

const Mixer = () => {
  const { setShowMixerModal, showMixerModal } = useAppContext();

  return (
    <div
      className="melofi__mixer-button"
      onClick={() => setShowMixerModal((prev) => !prev)}
      style={showMixerModal ? { outline: "1px solid rgba(254, 165, 57, 0.88)" } : {}}
    >
      <Tooltip text="Mixer">
        <RiSoundModuleFill size={20} color="white" style={{ cursor: "pointer" }} />
      </Tooltip>
    </div>
  );
};

export default Mixer;

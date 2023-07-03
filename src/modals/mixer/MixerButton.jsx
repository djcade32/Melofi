import React from "react";
import { RiSoundModuleFill } from "../../imports/icons";

import { useAppContext } from "../../context/AppContext";
import Tooltip from "../../components/tooltip/Tooltip";

const MixerButton = () => {
  const { setShowMixerModal, showMixerModal } = useAppContext();

  return (
    <div
      className="--nav-button"
      onClick={() => setShowMixerModal((prev) => !prev)}
      style={showMixerModal ? { outline: "1px solid var(--color-effect-opacity)" } : {}}
    >
      <Tooltip text="Mixer">
        <RiSoundModuleFill size={20} color="white" style={{ cursor: "pointer" }} />
      </Tooltip>
    </div>
  );
};

export default MixerButton;

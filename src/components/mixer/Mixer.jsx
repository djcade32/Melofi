import React, { useState } from "react";
import "./mixer.css";
import { RiSoundModuleFill } from "react-icons/ri";
import { IoVolumeOff, IoVolumeMedium } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import { Zoom } from "@mui/material";
import CustomSlider from "../customSlider/CustomSlider";

const Button = React.forwardRef(function Button(props, ref) {
  //  Spread the props to the underlying DOM element.
  return (
    <div {...props} ref={ref}>
      <RiSoundModuleFill size={20} color="white" />
    </div>
  );
});

const Mixer = () => {
  const [volumeLevel, setVolumeLevel] = useState(35);

  return (
    <>
      <div className="melofi__mixer-button" onClick={() => {}}>
        <Tooltip title="Mixer" TransitionComponent={Zoom}>
          <Button />
        </Tooltip>
      </div>
      <div className="melofi__mixer-modal">
        <p className="melofi__mixer-title">SOUNDS</p>
        <p className="melofi__mixer_volume-title">MUSIC VOLUME</p>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
          <IoVolumeOff size={33} color="var(--color-secondary)" />
          <div style={{ width: "75%" }}>
            <CustomSlider style={{ cursor: "pointer" }} onChange={() => {}} value={volumeLevel} />
          </div>
          <IoVolumeMedium size={33} color="var(--color-secondary)" />
        </div>
        <div>
          <CustomSlider
            style={{ cursor: "pointer" }}
            onChange={() => {}}
            value={volumeLevel}
            label="Rain"
          />
        </div>
      </div>
    </>
  );
};

export default Mixer;

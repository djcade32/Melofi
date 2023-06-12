import React from "react";
import "./sceneBg.css";

import { useAppContext } from "../../context/AppContext";

const SceneBg = () => {
  const { getCurrentScene } = useAppContext();

  return (
    <video
      src={getCurrentScene()}
      className="melofi__background-video"
      autoPlay
      loop
      muted
      playsInline
    />
  );
};

export default SceneBg;

import React, { useEffect, useState } from "react";
import "./sceneBg.css";

import { useAppContext } from "../../context/AppContext";

const SceneBg = () => {
  const { getCurrentScene, currentSceneIndex, setShowSceneModal, showSceneModal } = useAppContext();
  const [videoPath, setVideoPath] = useState(null);

  useEffect(() => {
    const currentScene = getCurrentScene();
    setVideoPath(currentScene.video);
  }, [currentSceneIndex]);

  return (
    <video src={videoPath} className="melofi__background-video" autoPlay loop muted playsInline />
  );
};

export default SceneBg;

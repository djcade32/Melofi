import React, { useEffect, useState } from "react";
import "./sceneBg.css";

import { useAppContext } from "../../context/AppContext";

const SceneBg = () => {
  const { getCurrentScene, currentSceneIndex } = useAppContext();

  const [videoPath, setVideoPath] = useState("");
  const [imgPath, setImgPath] = useState("");

  useEffect(() => {
    const currentScene = getCurrentScene();
    setVideoPath(currentScene.video);
    setImgPath(currentScene.image);
    setImgPath;
  }, [currentSceneIndex]);

  return (
    <video
      src={videoPath}
      className="melofi__background-video"
      autoPlay
      loop
      muted
      playsInline
      poster={imgPath}
    />
  );
};

export default SceneBg;

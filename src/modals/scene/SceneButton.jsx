import React, { useEffect } from "react";
import Tooltip from "../../components/tooltip/Tooltip";
import { useAppContext } from "../../context/AppContext";
import { MdLandscape } from "../../imports/icons";
import NewFeature from "../../components/newFeature/NewFeature";
import { scenes } from "../../data/scenes";

const SceneButton = () => {
  const { setShowSceneModal, newScenes, showSceneModal, setNewScenes } = useAppContext();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id === "app") {
        setShowSceneModal(false);
        updateScenesConfig();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const updateScenesConfig = () => {
    const scenesConfig = JSON.parse(localStorage.getItem("scenes"));

    if (scenes.length !== scenesConfig.length) {
      localStorage.setItem("scenes", JSON.stringify([...scenesConfig, ...newScenes]));
      setNewScenes([]);
    }
  };

  return (
    <div>
      <div
        className="--nav-button"
        onClick={() => {
          if (showSceneModal) {
            updateScenesConfig();
          }
          setShowSceneModal((prev) => !prev);
        }}
        style={
          showSceneModal
            ? { outline: "1px solid var(--color-effect-opacity)", position: "relative" }
            : { position: "relative" }
        }
      >
        {newScenes.length > 0 && <NewFeature />}
        <Tooltip text="Scenes">
          <MdLandscape size={20} color="white" style={{ cursor: "pointer" }} />
        </Tooltip>
      </div>
    </div>
  );
};

export default SceneButton;

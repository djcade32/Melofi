import React, { useEffect } from "react";
import Tooltip from "../../components/tooltip/Tooltip";
import { useAppContext } from "../../context/AppContext";
import { MdLandscape } from "../../imports/icons";
import NewFeature from "../../components/newFeature/NewFeature";

const SceneButton = () => {
  const { setShowSceneModal, newScenes, showSceneModal, setNewScenes } = useAppContext();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id === "app") {
        handleShowingModal();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleShowingModal = () => {
    setShowSceneModal((prev) => {
      if (prev) {
        const list = JSON.parse(localStorage.getItem("scenes"));
        localStorage.setItem("scenes", JSON.stringify([...list, ...newScenes]));
        setNewScenes([]);
      }
      return !prev;
    });
  };

  return (
    <div>
      <div
        className="--nav-button"
        onClick={handleShowingModal}
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

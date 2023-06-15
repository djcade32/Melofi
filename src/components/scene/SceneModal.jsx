import React from "react";
import "./sceneModal.css";
import { useAppContext } from "../../context/AppContext";

import { getIcon } from "../../helpers/icons";
import { scenes } from "../../data/scenes";

const iconProps = {
  size: 30,
  color: "var(--color-secondary-white)",
};

const SceneModal = () => {
  const { setCurrentSceneIndex, showSceneModal } = useAppContext();

  return (
    <>
      {showSceneModal && (
        <div className="melofi__sceneModal">
          <div className="melofi__sceneModal-header">
            <p className="melofi__sceneModal-title">SCENES</p>
          </div>
          <div className="melofi__sceneModal-thumbnail-container">
            {scenes.map((scene, index) => {
              return (
                <div
                  key={scene.name}
                  className="melofi__sceneModal-thumbnail"
                  style={{ backgroundImage: `url(${scene.image})` }}
                  onClick={() => setCurrentSceneIndex(index)}
                >
                  <p
                    className="melofi__sceneModal-thumbnail-title"
                    style={{ fontFamily: scene.fontFamily }}
                  >
                    {scene.name}
                  </p>
                  <div className="melofi__sceneModal-thumbnail-sounds-container">
                    {scene.sounds.map(({ sound }) => {
                      return getIcon(sound, iconProps);
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default SceneModal;

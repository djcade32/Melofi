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
        <div className="melofi__scene-modal">
          <div className="melofi__scene-modal-header">
            <p className="melofi__scene-modal-title">SCENES</p>
          </div>
          <div className="melofi__scene-modal-thumbnail-container">
            {scenes.map((scene, index) => {
              return (
                <div
                  key={scene.name}
                  className="melofi__scene-modal-thumbnail"
                  style={{ backgroundImage: `url(${scene.image})` }}
                  onClick={() => setCurrentSceneIndex(index)}
                >
                  <p
                    className="melofi__scene-modal-thumbnail-title"
                    style={{ fontFamily: scene.fontFamily }}
                  >
                    {scene.name}
                  </p>
                  <div className="melofi__scene-modal-thumbnail-sounds-container">
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

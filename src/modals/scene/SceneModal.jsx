import React from "react";
import "./sceneModal.css";
import { useAppContext } from "../../context/AppContext";

import { getIcon } from "../../helpers/icons";
import { scenes } from "../../data/scenes";
import usePremiumStatus from "../../../stripe/usePremiumStatus";
import { useAuthContext } from "../../context/AuthContext";
import { FaCrown } from "../../imports/icons";

const iconProps = {
  size: 30,
  color: "var(--color-secondary-white)",
};

function SceneModal() {
  const {
    setCurrentSceneIndex,
    showSceneModal,
    newScenes,
    setSelectedTemplate,
    selectedTemplate,
    setShowPremiumModal,
  } = useAppContext();
  const { user } = useAuthContext();

  const userIsPremium = usePremiumStatus(user);

  const handleSceneChange = (scene, index) => {
    if (scene.premium && !userIsPremium) {
      setShowPremiumModal(true);
      return;
    }
    setCurrentSceneIndex(index);
    localStorage.setItem("currentSceneIndex", JSON.stringify(index));
    if (selectedTemplate) {
      setSelectedTemplate(false);
    }
  };

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
                  style={{
                    backgroundImage: `url(${scene.image})`,
                    outline: newScenes.includes(scene.name)
                      ? "1px solid var(--color-effect-opacity)"
                      : "",
                  }}
                  onClick={() => handleSceneChange(scene, index)}
                >
                  {newScenes.includes(scene.name) && (
                    <div className="melofi__sceneModal-thumbnail_new_flag">
                      <p style={{ fontSize: 18 }}>NEW</p>
                    </div>
                  )}
                  {!userIsPremium && scene.premium && (
                    <div className="melofi__sceneModal-thumbnail_premium_icon">
                      <FaCrown size={30} color="var(--color-effect-opacity)" />
                    </div>
                  )}
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
}

export default SceneModal;

import React, { useState, useEffect, useRef } from "react";
import "./scene.css";
import { MdLandscape } from "react-icons/md";
import Tooltip from "../tooltip/Tooltip";
import { scenes } from "../../data/scenes";
import {
  BsCloudRain,
  BsTree,
  HiOutlineChatBubbleLeftRight,
  SlSocialTwitter,
  HiOutlineBuildingOffice2,
} from "../../imports/icons";
import { useAppContext } from "../../context/AppContext";

const Scene = () => {
  const [showModal, setShowModal] = useState(false);
  const { setCurrentSceneIndex } = useAppContext();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id === "app") {
        setShowModal(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const getSoundIcon = (sound) => {
    const props = {
      size: 30,
      color: "var(--color-secondary-white)",
      key: sound,
    };

    switch (sound) {
      case "rain":
        return <BsCloudRain {...props} />;

      case "chatter":
        return <HiOutlineChatBubbleLeftRight {...props} />;

      case "nature":
        return <BsTree {...props} />;

      case "birds-chirpping":
        return <SlSocialTwitter {...props} />;

      case "city":
        return <HiOutlineBuildingOffice2 {...props} />;

      default:
        break;
    }
  };
  return (
    <div>
      <div
        className="melofi__scene-button"
        onClick={() => {
          setShowModal((prev) => !prev);
        }}
      >
        <Tooltip text="Scenes">
          <MdLandscape size={20} color="white" style={{ cursor: "pointer" }} />
        </Tooltip>
      </div>

      {showModal && (
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
                    {scene.sounds.map((sound) => {
                      return getSoundIcon(sound);
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Scene;

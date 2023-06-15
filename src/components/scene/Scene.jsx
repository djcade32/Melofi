import React, { useState, useEffect } from "react";
import "./scene.css";
import Tooltip from "../tooltip/Tooltip";
import { useAppContext } from "../../context/AppContext";
import { MdLandscape } from "../../imports/icons";

const Scene = () => {
  const [showModal, setShowModal] = useState(false);
  const { setCurrentSceneIndex, showSceneModal, setShowSceneModal } = useAppContext();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id === "app") {
        setShowModal(false);
        setShowSceneModal(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div>
      <div
        className="melofi__scene-button"
        onClick={() => {
          setShowModal((prev) => !prev);
          setShowSceneModal((prev) => !prev);
        }}
        style={showModal ? { outline: "1px solid rgba(254, 165, 57, 0.88)" } : {}}
      >
        <Tooltip text="Scenes">
          <MdLandscape size={20} color="white" style={{ cursor: "pointer" }} />
        </Tooltip>
      </div>
    </div>
  );
};

export default Scene;

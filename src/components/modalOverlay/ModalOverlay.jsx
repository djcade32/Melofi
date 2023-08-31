import React from "react";
import { useAppContext } from "../../context/AppContext";

const ModalOverlay = () => {
  const { showModalOverlay, openWidgets } = useAppContext();
  const getZindex = () => {
    return 10 + openWidgets.length - 2;
  };
  return (
    <div
      style={{
        zIndex: showModalOverlay ? getZindex() : -1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: "auto",
        display: "flex",
        flex: 1,
        backgroundColor: "rgb(35,35,35,70%)",
        opacity: showModalOverlay ? 1 : 0,
        transition: "opacity 500ms ease 0s",
      }}
    />
  );
};

export default ModalOverlay;

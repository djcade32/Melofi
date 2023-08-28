import React from "react";
import { useAppContext } from "../../context/AppContext";

const ModalOverlay = () => {
  const { showModalOverlay } = useAppContext();
  return (
    <div
      style={{
        zIndex: 6,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: "auto",
        display: showModalOverlay ? "flex" : "none",
        flex: 1,
        backgroundColor: "rgb(35,35,35,70%)",
      }}
    />
  );
};

export default ModalOverlay;

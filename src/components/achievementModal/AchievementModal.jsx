import React, { useEffect, useRef } from "react";
import "./achievementModal.css";

const AchievementModal = ({ badge, setShowAchievementModal, setAchievementModalInfo }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const closeModal = () => {
    setShowAchievementModal(false);
    setAchievementModalInfo(null);
  };

  return (
    <div ref={modalRef} className="--widget-container melofi__achievementModal">
      <div>
        <p>{badge.title}</p>
        <div style={{ border: "1px solid var(--color-secondary-opacity)" }} />
        <p>{badge.description}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <p className="melofi__achievementModal_closeButton" onClick={closeModal}>
          Close
        </p>
      </div>
    </div>
  );
};

export default AchievementModal;

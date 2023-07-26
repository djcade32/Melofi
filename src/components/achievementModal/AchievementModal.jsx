import React, { useEffect, useRef } from "react";
import "./achievementModal.css";

const AchievementModal = ({ badge, setShowAchievementModal, setAchievementModalInfo }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowAchievementModal(false);
        setAchievementModalInfo(null);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={modalRef} className="--widget-container melofi__achievementModal">
      <p>{badge.title}</p>
      <div style={{ border: "1px solid var(--color-secondary-opacity)" }} />
      <p>{badge.description}</p>
    </div>
  );
};

export default AchievementModal;

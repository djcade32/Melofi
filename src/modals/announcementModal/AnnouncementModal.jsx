import React, { useEffect } from "react";
import "./announcementModal.css";
import { useAppContext } from "../../context/AppContext";
import { getWidgetDisplayPosition } from "../../helpers/common";
import { IoCloseOutline } from "../../imports/icons";

const AnnouncementModal = () => {
  const { showAnnouncementModal, setShowAnnouncementModal, openWidgets } = useAppContext();

  return (
    <div
      className="--widget-container melofi__announcementModal"
      style={{
        display: showAnnouncementModal ? "flex" : "none",
        zIndex: 10 + getWidgetDisplayPosition(openWidgets, "AnnouncementModal"),
      }}
    >
      <div className="melofi__announcementModal_header">
        <p style={{ fontSize: 21 }}>Announcement</p>
        <IoCloseOutline
          size={25}
          color="var(--color-secondary)"
          onClick={() => setShowAnnouncementModal(false)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="melofi__announcementModal_content">
        <p>
          🌟 Exciting News Coming on{" "}
          <span style={{ color: "var(--color-effect)" }}>September 27th, 2023</span>! 🌟
        </p>
        <p>
          Starting from <span style={{ color: "var(--color-effect)" }}>September 27th, 2023</span>,
          I am introducing something special for the Melofi community! 🎉
        </p>
        <p style={{ fontWeight: "bold" }}>🎶 Introducing Melofi Premium Membership 🎶</p>
        <p>
          Unlock an array of incredible features that will take your Melofi experience to the next
          level:
        </p>
        <p>
          🎵 <span>Additional Lofi Tracks</span>: Dive into a broader selection of handpicked Lofi
          tracks, setting the perfect backdrop for your focus and relaxation.
        </p>
        <p>
          🌆 <span>Additional Scenes</span>: Immerse yourself in a wider range of mesmerizing
          visuals, creating a more captivating atmosphere while you work, study, or unwind.
        </p>
        <p>
          🎧 <span>Melofi Playlist</span>: Access a curated Melofi playlist that encapsulates the
          essence of relaxation and productivity, helping you find your rhythm effortlessly.
        </p>
        <p>
          ⏲️ <span>Pomodoro Tasks</span>: Boost your productivity with integrated Pomodoro tasks,
          enhancing your work sessions and optimizing your time management.
        </p>
        <p>
          📋 <span>Templates</span>: Simplify your workflow with user-defined templates, allowing
          you to save your favorite sounds, scenes, and Melofi playlist as presets.
        </p>
        <p style={{ fontWeight: "bold" }}>🚀 Get Ready to Elevate Your Melofi Experience 🚀</p>
        <p>
          Starting <span style={{ color: "var(--color-effect)" }}>September 27th</span>, these
          incredible features will only be available exclusively to Melofi Premium members. I am
          committed to enhancing your journey of focus, creativity, and relaxation.
        </p>
        <p>Your support drives me to continue creating a better workspace for you!</p>
        <p> Thank you for being part of Melofi's journey,</p>
        <p> Norman Cade</p>
      </div>
    </div>
  );
};

export default AnnouncementModal;

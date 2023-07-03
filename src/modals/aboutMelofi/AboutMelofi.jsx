import React, { useEffect, useRef } from "react";
import "./aboutMelofi.css";
import { IoCloseOutline } from "../../imports/icons";
import { useAppContext } from "../../context/AppContext";

const AboutMelofi = () => {
  const aboutRef = useRef(null);
  const contentRef = useRef(null);
  const { setShowAboutMelofi, showAboutMelofi } = useAppContext();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setShowAboutMelofi(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    contentRef.current.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [showAboutMelofi]);
  return (
    <div
      ref={aboutRef}
      className="--widget-container melofi__aboutMelofi"
      style={{ display: showAboutMelofi ? "flex" : "none" }}
    >
      <div className="melofi__aboutMelofi_header">
        <p className="melofi__aboutMelofi_title">ABOUT MELOFI</p>
        <IoCloseOutline
          size={33}
          color="var(--color-secondary)"
          onClick={() => setShowAboutMelofi((prev) => !prev)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div ref={contentRef} className="melofi__aboutMelofi_content">
        <p>
          Melofi was created with students, professionals, and creative individuals in mind. It
          understands the need for a focused and tranquil setting during study, work, or creative
          pursuits. Whether you're tackling complex tasks or seeking a calming ambiance, Melofi
          caters to your desire for a productive atmosphere. Find solace in the soothing sounds of
          lofi music, as Melofi is designed to enhance your experience and elevate your productivity
          to new heights.
        </p>
        <a
          href="https://www.privacypolicies.com/live/b03a199b-bfaf-4667-9422-2daa813bf6a3"
          target="_blank"
          style={{
            color: "var(--color-secondary)",
            fontFamily: "var(--font-primary)",
            alignSelf: "center",
            marginTop: 10,
          }}
        >
          Privacy policy
        </a>
      </div>
    </div>
  );
};

export default AboutMelofi;

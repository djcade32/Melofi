import React from "react";
import "./aboutMelofi.css";
import { IoCloseOutline } from "../../imports/icons";
import { useAppContext } from "../../context/AppContext";

const AboutMelofi = () => {
  const { setShowAboutMelofi, showAboutMelofi } = useAppContext();
  return (
    <div className="melofi__aboutMelofi" style={{ display: showAboutMelofi ? "flex" : "none" }}>
      <div className="melofi__aboutMelofi_header">
        <p className="melofi__aboutMelofi_title">ABOUT MELOFI</p>
        <IoCloseOutline
          size={33}
          color="var(--color-secondary)"
          onClick={() => setShowAboutMelofi((prev) => !prev)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="melofi__aboutMelofi_content">
        <p>
          Melofi was created with students, professionals, and creative individuals in mind. It
          understands the need for a focused and tranquil setting during study, work, or creative
          pursuits. Whether you're tackling complex tasks or seeking a calming ambiance, Melofi
          caters to your desire for a productive atmosphere. Find solace in the soothing sounds of
          lofi music, as Melofi is designed to enhance your experience and elevate your productivity
          to new heights.
        </p>
        {/* <a
          href="https://bmc.link/normancade"
          target="_blank"
          style={{
            color: "var(--color-secondary)",
            fontFamily: "var(--font-poppins)",
            alignSelf: "center",
            marginTop: 10,
          }}
        >
          Privacy policy
        </a> */}
      </div>
    </div>
  );
};

export default AboutMelofi;

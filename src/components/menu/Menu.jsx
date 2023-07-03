import React, { useEffect, useRef } from "react";
import "./menu.css";

import {
  MdOutlineMenu,
  MdSettings,
  BsFillInfoCircleFill,
  FaCommentDots,
  FaHandsHelping,
} from "../../imports/icons";
import { useAppContext } from "../../context/AppContext";

const iconProps = {
  size: 15,
  color: "white",
  cursor: "pointer",
};

const linkStyle = {
  fontFamily: "var(--font-primary)",
  color: "white",
  fontSize: 16,
  fontWeight: 300,
};

const Menu = ({ isSleep }) => {
  const menuRef = useRef(null);
  const { showMenu, setShowMenu, setShowSettings, setShowAboutMelofi } = useAppContext();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (showMenu) {
      setShowMenu(false);
    }
  }, [isSleep]);
  return (
    <div ref={menuRef} className="--nav-button" onClick={() => setShowMenu((prev) => !prev)}>
      <MdOutlineMenu size={20} color="white" />
      {showMenu && (
        <div className="melofi__menu_modal">
          <div
            className="melofi__menu_modal_items"
            onClick={() => setShowSettings((prev) => !prev)}
          >
            <MdSettings {...iconProps} />
            <p>General settings</p>
          </div>
          <a
            href="https://forms.gle/53SKQW27bXiwdcNW8"
            target="_blank"
            className="melofi__menu_modal_items"
            style={linkStyle}
          >
            <FaCommentDots {...iconProps} />
            Leave feedback
          </a>
          <a
            href="https://bmc.link/normancade"
            target="_blank"
            className="melofi__menu_modal_items"
            style={linkStyle}
          >
            <FaHandsHelping {...iconProps} />
            Support
          </a>
          <div
            className="melofi__menu_modal_items"
            onClick={() => setShowAboutMelofi((prev) => !prev)}
          >
            <BsFillInfoCircleFill {...iconProps} />
            <p>About Melofi</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;

import React, { useEffect, useRef } from "react";
import "./menu.css";

import {
  MdOutlineMenu,
  MdSettings,
  BsFillInfoCircleFill,
  FaCommentDots,
} from "../../imports/icons";
import { useAppContext } from "../../context/AppContext";

const iconProps = {
  size: 15,
  color: "white",
  cursor: "pointer",
};

const Menu = ({ isSleep }) => {
  const menuRef = useRef(null);
  const { showMenu, setShowMenu, setShowSettings } = useAppContext();

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
    <div ref={menuRef} className="melofi__menu" onClick={() => setShowMenu((prev) => !prev)}>
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
          <div className="melofi__menu_modal_items">
            <FaCommentDots {...iconProps} />
            <p>Leave feedback</p>
          </div>
          <div className="melofi__menu_modal_items">
            <BsFillInfoCircleFill {...iconProps} />
            <p>About us</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;

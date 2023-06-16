import React, { useEffect, useState } from "react";
import "./toolsMenu.css";
import {
  AiFillTool,
  AiOutlineGoogle,
  BsFillCalendarDateFill,
  HiClipboardDocumentList,
  FaStickyNote,
} from "../../imports/icons";
import Tooltip from "../tooltip/Tooltip";

const iconProps = {
  size: 15,
  color: "white",
  cursor: "pointer",
};

const ToolsMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id === "app") {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <div
      className="melofi__toolsMenu"
      style={showMenu ? { outline: "1px solid rgba(254, 165, 57, 0.88)" } : {}}
      onClick={() => setShowMenu((prev) => !prev)}
    >
      <Tooltip text="Tools">
        <AiFillTool {...iconProps} />
      </Tooltip>

      {showMenu && (
        <div className="melofi__toolsMenu-container">
          <div className="melofi__toolsMenu-container-items">
            <FaStickyNote {...iconProps} />
            <p>Take notes</p>
          </div>
          <div className="melofi__toolsMenu-container-items">
            <HiClipboardDocumentList {...iconProps} />
            <p>To-do list</p>
          </div>
          <div className="melofi__toolsMenu-container-items">
            <BsFillCalendarDateFill {...iconProps} />
            <p>Calendar</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolsMenu;

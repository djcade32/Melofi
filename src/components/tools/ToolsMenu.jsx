import React, { useEffect } from "react";
import "./toolsMenu.css";
import {
  AiFillTool,
  BsFillCalendarDateFill,
  HiClipboardDocumentList,
  FaStickyNote,
} from "../../imports/icons";
import Tooltip from "../tooltip/Tooltip";
import { useAppContext } from "../../context/AppContext";

const iconProps = {
  size: 15,
  color: "white",
  cursor: "pointer",
};

const ToolsMenu = ({ isSleep }) => {
  const { setShowToolsMenu, showToolsMenu, setShowCalendar } = useAppContext();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id === "app") {
        setShowToolsMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (showToolsMenu) {
      setShowToolsMenu(false);
    }
  }, [isSleep]);
  return (
    <div
      className="melofi__toolsMenu"
      style={showToolsMenu ? { outline: "1px solid rgba(254, 165, 57, 0.88)" } : {}}
      onClick={() => setShowToolsMenu((prev) => !prev)}
    >
      <Tooltip text="Tools">
        <AiFillTool {...iconProps} />
      </Tooltip>

      {showToolsMenu && (
        <div className="melofi__toolsMenu-container">
          <div className="melofi__toolsMenu-container-items">
            <FaStickyNote {...iconProps} />
            <p>Take notes</p>
          </div>
          <div className="melofi__toolsMenu-container-items">
            <HiClipboardDocumentList {...iconProps} />
            <p>To-do list</p>
          </div>
          <div
            className="melofi__toolsMenu-container-items"
            onClick={() => setShowCalendar((prev) => !prev)}
          >
            <BsFillCalendarDateFill {...iconProps} />
            <p>Calendar</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolsMenu;

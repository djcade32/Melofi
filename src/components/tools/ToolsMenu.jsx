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
  const { setShowToolsMenu, showToolsMenu, setShowToDoList } = useAppContext();

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
            <div>
              <p>Sticky</p>
              <p
                style={{
                  fontStyle: "italic",
                  fontSize: 10,
                }}
              >
                {"(Coming soon)"}
              </p>
            </div>
          </div>
          <div
            className="melofi__toolsMenu-container-items"
            onClick={() => setShowToDoList((prev) => !prev)}
          >
            <HiClipboardDocumentList {...iconProps} />
            <p>To-do list</p>
          </div>
          <div className="melofi__toolsMenu-container-items" onClick={() => {}}>
            <BsFillCalendarDateFill {...iconProps} />
            <div>
              <p>Calendar</p>
              <p
                style={{
                  fontStyle: "italic",
                  fontSize: 10,
                }}
              >
                {"(Coming soon)"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolsMenu;

import React, { useEffect, useRef } from "react";
import "./toolsMenu.css";
import {
  AiFillTool,
  BsFillCalendarDateFill,
  HiClipboardDocumentList,
  FaStickyNote,
} from "../../imports/icons";
import Tooltip from "../tooltip/Tooltip";
import { useAppContext } from "../../context/AppContext";
import { DEFAULT } from "../../enums/colors";

const iconProps = {
  size: 15,
  color: "white",
  cursor: "pointer",
};

const ToolsMenu = ({ isSleep }) => {
  const toolsMenuRef = useRef(null);
  const {
    setShowToolsMenu,
    showToolsMenu,
    setShowToDoList,
    setAllStickyNotes,
    allStickyNotes,
    setShowCalendar,
  } = useAppContext();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target)) {
        setShowToolsMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  // This keeps the menu open on all clicks except for clicking the background
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (event.target.id === "app") {
  //       setShowToolsMenu(false);
  //     }
  //   };
  //   document.addEventListener("click", handleClickOutside, true);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside, true);
  //   };
  // }, []);

  useEffect(() => {
    if (showToolsMenu) {
      setShowToolsMenu(false);
    }
  }, [isSleep]);
  return (
    <div
      ref={toolsMenuRef}
      className="melofi__toolsMenu"
      style={showToolsMenu ? { outline: "1px solid rgba(254, 165, 57, 0.88)" } : {}}
      onClick={() => setShowToolsMenu((prev) => !prev)}
    >
      <Tooltip text="Tools">
        <AiFillTool {...iconProps} size={20} />
      </Tooltip>

      {showToolsMenu && (
        <div className="melofi__toolsMenu-container">
          <div
            className="melofi__toolsMenu-container-items"
            onClick={() => {
              const newNote = {
                id: allStickyNotes.length + 1,
                title: "",
                bodyText: "",
                color: { text: "white", bg: DEFAULT },
                isNew: true,
                defaultPosition: { x: 0, y: 0 },
                isCollapsed: false,
              };
              setAllStickyNotes((prev) => [...prev, newNote]);
            }}
          >
            <FaStickyNote {...iconProps} />
            <div>
              <p>Sticky note</p>
            </div>
          </div>
          <div
            className="melofi__toolsMenu-container-items"
            onClick={() => setShowToDoList((prev) => !prev)}
          >
            <HiClipboardDocumentList {...iconProps} />
            <div>
              <p>To-Do list</p>
            </div>
          </div>
          <div
            className="melofi__toolsMenu-container-items"
            onClick={() => setShowCalendar((prev) => !prev)}
          >
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

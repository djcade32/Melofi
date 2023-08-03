import React, { useEffect, useRef, useState } from "react";
import "./toolsMenu.css";
import {
  AiFillTool,
  BsFillCalendarDateFill,
  HiClipboardDocumentList,
  FaStickyNote,
  MdTimer,
  MdLibraryMusic,
} from "../../imports/icons";
import Tooltip from "../tooltip/Tooltip";
import { useAppContext } from "../../context/AppContext";
import { DEFAULT } from "../../enums/colors";

const iconProps = {
  size: 20,
  color: "white",
  cursor: "pointer",
};

const ToolsMenu = ({ isSleep, newToolPopupVisible, setNewToolPopupVisible }) => {
  const toolsMenuRef = useRef(null);
  const {
    setShowToolsMenu,
    showToolsMenu,
    setShowToDoList,
    setAllStickyNotes,
    allStickyNotes,
    setShowCalendar,
    setShowTimer,
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

  // Closes tool menu if UI falls asleep
  useEffect(() => {
    if (showToolsMenu) {
      setShowToolsMenu(false);
    }
  }, [isSleep]);

  useEffect(() => {
    let new_tool_popup_status = localStorage.getItem("new_tool_popup_status");
    if (!new_tool_popup_status) {
      setNewToolPopupVisible(true);
    }
  }, []);

  const createNewStickyNote = () => {
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
  };

  const removeNewFeature = () => {
    setNewToolPopupVisible(false);
    localStorage.setItem("new_tool_popup_status", true);
  };
  return (
    <div
      ref={toolsMenuRef}
      className="--nav-button"
      style={showToolsMenu ? { outline: "1px solid var(--color-effect-opacity)" } : {}}
      onClick={() => setShowToolsMenu((prev) => !prev)}
    >
      <Tooltip text={showToolsMenu ? "" : "Tools"}>
        <AiFillTool {...iconProps} size={20} />
      </Tooltip>

      {showToolsMenu && (
        <div className="melofi__toolsMenu-container">
          <Tooltip text="Sticky notes">
            <div className="melofi__toolsMenu-container-items" onClick={createNewStickyNote}>
              <FaStickyNote {...iconProps} />
            </div>
          </Tooltip>
          <Tooltip text="To-Do list">
            <div
              className="melofi__toolsMenu-container-items"
              onClick={() => setShowToDoList((prev) => !prev)}
            >
              <HiClipboardDocumentList {...iconProps} />
            </div>
          </Tooltip>
          <Tooltip text="Calendar">
            <div
              style={{ position: "relative" }}
              className="melofi__toolsMenu-container-items"
              onClick={() => {
                setShowCalendar((prev) => !prev);
                removeNewFeature();
              }}
            >
              <BsFillCalendarDateFill {...iconProps} />
              {newToolPopupVisible && <div className="melofi__toolsMenu_new" />}
            </div>
          </Tooltip>
          <Tooltip text="Timer">
            <div
              className="melofi__toolsMenu-container-items"
              onClick={() => setShowTimer((prev) => !prev)}
            >
              <MdTimer {...iconProps} />
            </div>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default ToolsMenu;

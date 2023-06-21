import React, { useEffect, useRef, useState } from "react";
import "./stickyNoteWidget.css";
import {
  MdDelete,
  MdModeEdit,
  MdOutlineDone,
  BsCaretUpFill,
  BsCaretDownFill,
} from "../../imports/icons";
import Tooltip from "../tooltip/Tooltip";
import { isSafariBrowser } from "../../helpers/browser";
import Draggable from "react-draggable";
import { useAppContext } from "../../context/AppContext";

const RED = "rgba(237, 60, 60, 0.88)";
const GREEN = "rgba(23, 170, 7, 0.88)";
const YELLOW = "rgba(241, 241, 57, 0.88)";
const PURPLE = "rgba(192, 91, 225, 0.88)";
const BLUE = "rgba(41, 89, 235, 0.88)";
const DEFAULT = "var(--color-primary)";
const BLACK = "#232323";

const StickyNoteWidget = ({ title, bodyText, id }) => {
  const nodeRef = useRef(null);
  const { allStickyNotes, setAllStickyNotes } = useAppContext();
  const [titleInput, setTitleInput] = useState(title);
  const [bodyTextInput, setBodyTextInput] = useState(bodyText);
  const [editMode, setEditMode] = useState(true);
  const [noteBgColor, setNoteBgColor] = useState("var(--color-primary)");
  const [textColor, setTextColor] = useState("white");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    document.getElementById(`stickyNoteInput-${id}`).focus();
  }, []);

  function updateInputPlaceholderColor(color) {
    document.getElementById(`stickyNoteInput-${id}`).style.setProperty("--c", color);
    document.getElementById(`stickyNoteTextarea-${id}`).style.setProperty("--c", color);
  }

  const handleDelete = () => {
    const newList = allStickyNotes.filter((note) => note.id !== id);
    setAllStickyNotes(newList);
  };

  const getCorrectCollapseIcon = () => {
    if (isCollapsed) {
      return (
        <Tooltip text={"Expand"} bgColor={"var(--color-secondary)"}>
          <BsCaretUpFill
            size={25}
            color="white"
            onClick={() => setIsCollapsed((prev) => !prev)}
            style={{ cursor: "pointer" }}
          />
        </Tooltip>
      );
    } else {
      return (
        <Tooltip text={"Collapse"} bgColor={"var(--color-secondary)"}>
          <BsCaretDownFill
            size={25}
            color="white"
            onClick={() => setIsCollapsed((prev) => !prev)}
            style={{ cursor: "pointer" }}
          />
        </Tooltip>
      );
    }
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds={isSafariBrowser() ? "" : ".fullscreen"}
      disabled={editMode}
    >
      <div
        className="melofi__stickyNote"
        ref={nodeRef}
        style={{
          cursor: !editMode ? "all-scroll" : "",
          backgroundColor: noteBgColor,
          animation: isCollapsed ? "collapse 0.4s forwards" : "expand 0.4s forwards",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Tooltip text={editMode ? "Done" : "Edit"} bgColor={"var(--color-secondary)"}>
            <div
              className="melofi__stickyNote_doneEdit_button"
              style={editMode ? { opacity: "100%" } : {}}
            >
              {editMode ? (
                <MdOutlineDone
                  size={25}
                  color="white"
                  onClick={() => setEditMode(false)}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <MdModeEdit
                  size={25}
                  color="white"
                  onClick={() => setEditMode(true)}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
          </Tooltip>
          {editMode ? (
            <Tooltip text={"Delete"} bgColor={"var(--color-secondary)"}>
              <MdDelete
                size={25}
                color="var(--color-effect-opacity)"
                onClick={handleDelete}
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
          ) : (
            getCorrectCollapseIcon()
          )}
        </div>
        <div>
          <div className="melofi__stickyNote_header_title_input">
            <input
              id={`stickyNoteInput-${id}`}
              disabled={!editMode}
              type="text"
              value={titleInput}
              placeholder={`New Note - ${id}`}
              onChange={(e) => setTitleInput(e.target.value)}
              style={{ cursor: !editMode ? "all-scroll" : "", color: textColor }}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: 10,
            width: "100%",
            backgroundColor: "var(--color-secondary-opacity)",
            height: 2,
            alignSelf: "center",
          }}
        />
        <div className="melofi__stickyNote_body">
          <textarea
            id={`stickyNoteTextarea-${id}`}
            disabled={!editMode}
            placeholder="Write yourself a note."
            value={bodyTextInput}
            onChange={(e) => setBodyTextInput(e.target.value)}
            style={{
              cursor: !editMode ? "all-scroll" : "",
              color: textColor,
              height: isCollapsed ? 0 : 260,
            }}
          />
        </div>

        {editMode && (
          <>
            <div
              className="melofi__stickyNote_noteBgEditPanel"
              style={{
                animation: editMode
                  ? "slide-to-right-fade-in 0.4s forwards"
                  : "slide-to-left-fade-out 0.4s forwards",
                backgroundColor: noteBgColor,
              }}
            >
              <div className="melofi__stickyNote_noteBgEditPanel_noteBgColors">
                <div style={{ backgroundColor: RED }} onClick={() => setNoteBgColor(RED)} />
                <div style={{ backgroundColor: GREEN }} onClick={() => setNoteBgColor(GREEN)} />
                <div style={{ backgroundColor: PURPLE }} onClick={() => setNoteBgColor(PURPLE)} />
                <div style={{ backgroundColor: DEFAULT }} onClick={() => setNoteBgColor(DEFAULT)} />
                <div style={{ backgroundColor: BLUE }} onClick={() => setNoteBgColor(BLUE)} />
                <div style={{ backgroundColor: YELLOW }} onClick={() => setNoteBgColor(YELLOW)} />
              </div>
            </div>

            <div
              className="melofi__stickyNote_noteTextEditPanel"
              style={{
                animation: editMode
                  ? "slide-to-left-fade-in 0.4s forwards"
                  : "slide-to-right-fade-out 0.4s forwards",
                backgroundColor: noteBgColor,
              }}
            >
              <div className="melofi__stickyNote_noteTextEditPanel_noteTextColors">
                <div
                  style={{ backgroundColor: BLACK }}
                  onClick={() => {
                    updateInputPlaceholderColor(BLACK);
                    setTextColor(BLACK);
                  }}
                />
                <div
                  style={{ backgroundColor: "white" }}
                  onClick={() => {
                    updateInputPlaceholderColor("white");
                    setTextColor("white");
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Draggable>
  );
};

export default StickyNoteWidget;

import React, { useRef, useState } from "react";
import "./stickyNoteWidget.css";
import { MdDelete, MdModeEdit, MdOutlineDone } from "../../imports/icons";
import Tooltip from "../tooltip/Tooltip";
import { isSafariBrowser } from "../../helpers/browser";
import Draggable from "react-draggable";

const RED = "rgba(237, 60, 60, 0.88)";
const GREEN = "rgba(23, 170, 7, 0.88)";
const YELLOW = "rgba(241, 241, 57, 0.88)";
const PURPLE = "rgba(192, 91, 225, 0.88)";
const BLUE = "rgba(41, 89, 235, 0.88)";
const DEFAULT = "var(--color-primary)";
const BLACK = "#232323";

const StickyNoteWidget = () => {
  const nodeRef = useRef(null);
  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [noteBgColor, setNoteBgColor] = useState("var(--color-primary)");
  const [textColor, setTextColor] = useState("white");

  function updateInputPlaceholderColor(color) {
    document.getElementById("stickyNoteInput").style.setProperty("--c", color);
    document.getElementById("stickyNoteTextarea").style.setProperty("--c", color);
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds={isSafariBrowser() ? "" : ".fullscreen"}
      disabled={editMode}
    >
      <div
        className="melofi__stickyNote"
        ref={nodeRef}
        style={{ cursor: !editMode ? "all-scroll" : "", backgroundColor: noteBgColor }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Tooltip text={editMode ? "Save" : "Edit"} bgColor={"var(--color-secondary)"}>
            {editMode ? (
              <MdOutlineDone
                size={25}
                color="var(--color-secondary)"
                onClick={() => setEditMode(false)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <MdModeEdit
                size={25}
                color="var(--color-secondary)"
                onClick={() => setEditMode(true)}
                style={{ cursor: "pointer" }}
              />
            )}
          </Tooltip>
          <div
            style={{
              display: editMode ? "flex" : "none",
            }}
          >
            <Tooltip text="Delete" bgColor={"var(--color-secondary)"}>
              <MdDelete
                size={25}
                color="var(--color-effect-opacity)"
                onClick={() => {}}
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <div className="melofi__stickyNote_header_title_input">
            <input
              id="stickyNoteInput"
              disabled={!editMode}
              type="text"
              value={title}
              placeholder="New Note - 1"
              onChange={(e) => setTitle(e.target.value)}
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
            id="stickyNoteTextarea"
            disabled={!editMode}
            placeholder="Write yourself a note."
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            style={{ cursor: !editMode ? "all-scroll" : "", color: textColor }}
          />
        </div>

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
      </div>
    </Draggable>
  );
};

export default StickyNoteWidget;

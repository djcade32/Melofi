import React, { useEffect, useRef, useState } from "react";
import "./stickyNoteWidget.css";
import {
  MdDelete,
  MdModeEdit,
  MdOutlineDone,
  BsCaretUpFill,
  BsCaretDownFill,
} from "../../imports/icons";
import Tooltip from "../../components/tooltip/Tooltip";
import { isSafariBrowser } from "../../helpers/browser";
import Draggable from "react-draggable";
import { useAppContext } from "../../context/AppContext";
import { DEFAULT, RED, YELLOW, GREEN, BLUE, PURPLE, BLACK } from "../../enums/colors";

const StickyNoteWidget = ({ note }) => {
  const { title, bodyText, id, isNew, defaultPosition, color, isCollapsed } = note;
  const nodeRef = useRef(null);
  const { allStickyNotes, setAllStickyNotes } = useAppContext();
  const [titleInput, setTitleInput] = useState(title);
  const [bodyTextInput, setBodyTextInput] = useState(bodyText);
  const [editMode, setEditMode] = useState(isNew);
  const [noteBgColor, setNoteBgColor] = useState(color.bg);
  const [textColor, setTextColor] = useState(color.text);
  const [isCollapsedInput, setIsCollapsedInput] = useState(isCollapsed);
  const [position, setPosition] = useState(defaultPosition);

  useEffect(() => {
    document.getElementById(`stickyNoteInput-${id}`).focus();
    updateInputPlaceholderColor(textColor);
  }, []);

  useEffect(() => {
    if (!editMode) {
      const newList = [];
      allStickyNotes.map((note) => {
        if (note.id === id) {
          const updatedNote = {
            ...note,
            title: titleInput,
            bodyText: bodyTextInput,
            color: { text: textColor, bg: noteBgColor },
            isNew: false,
          };
          newList.push(updatedNote);
        } else {
          newList.push(note);
        }
        setAllStickyNotes(newList);
      });
      localStorage.setItem("stickyNoteList", JSON.stringify(newList));
    }
  }, [editMode]);

  useEffect(() => {
    if (!isNew && position !== defaultPosition) {
      const newList = [];
      allStickyNotes.map((note) => {
        if (note.id === id) {
          const updatedNote = {
            ...note,
            defaultPosition: position,
          };
          newList.push(updatedNote);
        } else {
          newList.push(note);
        }
        setAllStickyNotes(newList);
      });
      localStorage.setItem("stickyNoteList", JSON.stringify(newList));
    }
  }, [position]);

  useEffect(() => {
    if (!isNew) {
      const newList = [];
      allStickyNotes.map((note) => {
        if (note.id === id) {
          const updatedNote = {
            ...note,
            isCollapsed: isCollapsedInput,
          };
          newList.push(updatedNote);
        } else {
          newList.push(note);
        }
        setAllStickyNotes(newList);
      });
      localStorage.setItem("stickyNoteList", JSON.stringify(newList));
    }
  }, [isCollapsedInput]);

  function updateInputPlaceholderColor(color) {
    document.getElementById(`stickyNoteInput-${id}`).style.setProperty("--c", color);
    document.getElementById(`stickyNoteTextarea-${id}`).style.setProperty("--c", color);
  }

  const handleDelete = () => {
    const newList = allStickyNotes.filter((note) => note.id !== id);
    localStorage.setItem("stickyNoteList", JSON.stringify(newList));
    setAllStickyNotes(newList);
  };

  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const getCorrectCollapseIcon = () => {
    if (isCollapsedInput) {
      return (
        <Tooltip text={"Expand"} bgColor={"var(--color-secondary)"}>
          <BsCaretUpFill
            size={25}
            color="white"
            onClick={() => setIsCollapsedInput((prev) => !prev)}
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
            onClick={() => setIsCollapsedInput((prev) => !prev)}
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
      defaultPosition={position}
      onStop={(e, data) => trackPos(data)}
    >
      <div
        className="--widget-container melofi__stickyNote"
        ref={nodeRef}
        style={{
          cursor: !editMode ? "all-scroll" : "",
          backgroundColor: noteBgColor,
          animation: isCollapsedInput ? "collapse 0.4s forwards" : "expand 0.4s forwards",
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
              height: isCollapsedInput ? 0 : "",
              animation: isCollapsedInput ? "" : "expoand-textarea 0.4s forwards",
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

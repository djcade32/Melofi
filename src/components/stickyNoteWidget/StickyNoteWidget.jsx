import React, { useRef, useState } from "react";
import "./stickyNoteWidget.css";
import { MdDelete, MdModeEdit, MdOutlineDone } from "../../imports/icons";
import Tooltip from "../tooltip/Tooltip";
import { isSafariBrowser } from "../../helpers/browser";
import Draggable from "react-draggable";

const StickyNoteWidget = () => {
  const nodeRef = useRef(null);
  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const handleTitleInput = (e) => {
    // console.log("length: ", e.target.value.length);
    // console.log("width: ", getTextWidth(e.target.value, "var(--font-poppins)"));
    // if (getTextWidth(e.target.value, "var(--font-poppins)") < 115) {
    setTitle(e.target.value);
    // }
  };

  function textAreaAdjust(element) {
    console.log("height: ", element.target.clientHeight);
    console.log("scrollheight: ", element.target.scrollHeight);
    // element.style.height = "1px";
    // element.style.height = 25 + element.scrollHeight + "px";
  }

  function getTextWidth(text, font) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    context.font = font || getComputedStyle(document.body).font;

    return context.measureText(text).width;
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
        style={!editMode ? { cursor: "all-scroll" } : {}}
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
              disabled={!editMode}
              type="text"
              value={title}
              placeholder="New Note - 1"
              onChange={(e) => setTitle(e.target.value)}
              style={!editMode ? { cursor: "all-scroll" } : {}}
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
            disabled={!editMode}
            placeholder="Write yourself a note."
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            style={!editMode ? { cursor: "all-scroll" } : {}}
          />
        </div>
      </div>
    </Draggable>
  );
};

export default StickyNoteWidget;

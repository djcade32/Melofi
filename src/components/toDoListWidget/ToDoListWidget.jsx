import React, { useEffect, useRef, useState } from "react";
import "./toDoListWidget.css";
import { FiPlus, IoCloseOutline } from "../../imports/icons";
import { useAppContext } from "../../context/AppContext";
import Draggable from "react-draggable";
import ToDoListItem from "./ToDoListItem";
import { isSafariBrowser } from "../../helpers/browser";

const ToDoListWidget = () => {
  const nodeRef = useRef(null);
  const plusRef = useRef(null);
  const { setShowToDoList, showToDoList } = useAppContext();
  const [list, setList] = useState(JSON.parse(localStorage.getItem("toDoList")) || []);
  const [input, setInput] = useState("");
  const [position, setPosition] = useState(
    JSON.parse(localStorage.getItem("toDoListPosition")) || { x: 0, y: 0 }
  );

  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    const handleEnter = (event) => {
      if (event.key === "Enter") {
        plusRef.current.click();
      }
    };
    document.getElementById("input").addEventListener("keydown", handleEnter, true);
  }, []);

  const handleTaskAdded = () => {
    const inputTrim = input.trim();
    if (inputTrim !== "") {
      const newTask = {
        title: inputTrim,
        isDone: false,
      };
      setList((prev) => [...prev, newTask]);
      setInput("");
    }
  };

  const determineHeight = (list) => {
    let offset = 0;
    if (list.length > 0) {
      offset = 45 * list.length;
    }
    const height = 150 + offset;
    if (height < 370) {
      return height;
    }
    return 370;
  };

  const trackPos = (data) => {
    const coords = { x: data.x, y: data.y };
    setPosition(coords);
    localStorage.setItem("toDoListPosition", JSON.stringify(coords));
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds={isSafariBrowser() ? "" : ".fullscreen"}
      handle="#handle"
      defaultPosition={position}
      onStop={(e, data) => trackPos(data)}
    >
      <div
        className="melofi__todolist"
        ref={nodeRef}
        style={{ display: showToDoList ? "flex" : "none", height: determineHeight(list) }}
      >
        <div id="handle" className="melofi__todolist_handle" />
        <div className="melofi__todlist_header" id="handle">
          <p className="melofi__todolist_header_title">TO-DO LIST</p>
          <div className="melofi__todolist_exit_button">
            <IoCloseOutline
              className="melofi__todolist_exit"
              size={33}
              color="var(--color-secondary)"
              onClick={() => setShowToDoList(false)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="melofi__todolist_input">
          <input
            id="input"
            type="text"
            placeholder="Add new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div ref={plusRef} onClick={handleTaskAdded}>
            <FiPlus size={30} color="white" cursor={"pointer"} />
          </div>
        </div>
        <div className="melofi__todolist_content">
          {list.map((task, index) => (
            <ToDoListItem
              key={task.title + index}
              title={task.title}
              isDone={task.isDone}
              list={list}
              setList={setList}
            />
          ))}
        </div>
      </div>
    </Draggable>
  );
};

export default ToDoListWidget;

import React, { useEffect, useRef, useState } from "react";
import "./toDoListWidget.css";
import { FiPlus, IoCloseOutline } from "../../imports/icons";
import { useAppContext } from "../../context/AppContext";
import Draggable from "react-draggable";
import ToDoListItem from "./ToDoListItem";
import { isSafariBrowser } from "../../helpers/browser";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthContext } from "../../context/AuthContext";

const ToDoListWidget = () => {
  const nodeRef = useRef(null);
  const plusRef = useRef(null);
  const { user, db } = useAuthContext();
  const { setShowToDoList, showToDoList, settingsConfig, setNewAchievements } = useAppContext();
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
        id: list.length,
        title: inputTrim,
        isDone: false,
      };
      setList((prev) => [...prev, newTask]);
      setInput("");
      console.log("adding task");
      if (user !== null) {
        updateTaskNinjaAchievement();
      }
    }
  };

  const determineHeight = (list) => {
    let offset = 0;
    if (list.length > 0) {
      offset = 50 * list.length;
    }
    const height = 100 + offset;
    if (height < 310) {
      return height;
    }
    return 310;
  };

  const trackPos = (data) => {
    const coords = { x: data.x, y: data.y };
    setPosition(coords);
    localStorage.setItem("toDoListPosition", JSON.stringify(coords));
  };

  const getFadeStyle = () => {
    return settingsConfig.fadeAway.todoList
      ? { display: showToDoList ? "flex" : "none", height: determineHeight(list) }
      : noFadeStyle;
  };

  const updateTaskNinjaAchievement = async () => {
    const docRef = doc(db, `users/${user.uid}`);
    const userSnapshot = await getDoc(docRef);
    if (userSnapshot.exists()) {
      const newData = userSnapshot.data().achievementsProgress.taskNinja + 1;
      let userData = {
        achievementsProgress: {
          ...userSnapshot.data().achievementsProgress,
          taskNinja: newData,
        },
      };
      if (!userSnapshot.data().achievements.includes("taskNinja") && newData >= 25) {
        console.log("achieved task ninjas");
        userData.achievements = [...userSnapshot.data().achievements, "taskNinja"];
        setNewAchievements((prev) => [...prev, "taskNinja"]);
      }
      try {
        await updateDoc(docRef, userData);
      } catch (error) {
        console.log("Error updating user lastLoginAt: ", error);
      }
    }
  };

  const noFadeStyle = {
    backgroundColor: "var(--color-primary)",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    backdropFilter: "blur(10px)",
    display: showToDoList ? "flex" : "none",
    height: determineHeight(list),
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds={isSafariBrowser() ? "" : ".fullscreen"}
      handle="#handle"
      defaultPosition={position}
      onStop={(e, data) => trackPos(data)}
    >
      <div className="--widget-container melofi__todolist" ref={nodeRef} style={getFadeStyle()}>
        <div id="handle" className="melofi__todolist_handle" />
        <div className="melofi__todlist_header" id="handle">
          <p className="melofi__todolist_header_title">TO-DO LIST</p>
          <div className="melofi__todolist_exit_button">
            <IoCloseOutline
              className="melofi__todolist_exit"
              size={25}
              color="var(--color-secondary)"
              onClick={() => setShowToDoList(false)}
              cursor={"pointer"}
              style={settingsConfig.fadeAway.todoList ? {} : { opacity: "100%" }}
            />
          </div>
        </div>
        <div
          className={
            settingsConfig.fadeAway.todoList
              ? "melofi__todolist_input"
              : "melofi__todolist_input_noFade"
          }
        >
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
              id={task.id}
            />
          ))}
        </div>
      </div>
    </Draggable>
  );
};

export default ToDoListWidget;

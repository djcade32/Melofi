import React, { useEffect, useState } from "react";
import "./toDoListItem.css";
import { IoCloseOutline } from "../../imports/icons";

const ToDoListItem = ({ isDone, title, list, setList, id }) => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(isDone);
  }, [list]);

  const handleTaskComplete = () => {
    const newList = [];
    list.map((task) => {
      const newTask = {
        id: task.id,
        title: task.title,
        isDone: task.isDone,
      };
      if (task.id === id) {
        newTask.isDone = !done;
      }
      newList.push(newTask);
    });
    setList(newList);
  };

  const handleTaskDelete = () => {
    const newList = list.filter((task) => task.id !== id);
    setList(newList);
  };
  return (
    <div className="melofi__todolistItem">
      <div
        style={{
          display: "flex",
          columnGap: 15,
        }}
      >
        <div
          className="melofi__todolistItem_circle"
          style={{ backgroundColor: done ? "var(--color-effect-opacity)" : "" }}
          onClick={handleTaskComplete}
        />
        <p
          className="melofi__todolistItem_title"
          style={{ textDecoration: done ? "line-through" : "", opacity: done ? "50%" : "100%" }}
        >
          {title}
        </p>
      </div>
      <div>
        <IoCloseOutline
          className="melofi__todolistItem_delete"
          size={20}
          color="var(--color-secondary)"
          onClick={handleTaskDelete}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default ToDoListItem;

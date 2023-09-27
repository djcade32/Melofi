import React, { useState } from "react";
import "./addTaskModal.css";

import { RxTimer, BsLightningCharge, BsArrowRepeat } from "../../imports/icons";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import uuid from "react-uuid";
import { useAuthContext } from "../../context/AuthContext";

const addTaskModalInputDefault = {
  taskName: "",
  focusTime: {
    hr: "00",
    min: "00",
    sec: "00",
  },
  breakTime: {
    hr: "00",
    min: "00",
    sec: "00",
  },
  sessions: 1,
};

const numbersRegex = /^[0-9]+$/;

const AddTaskModal = ({ setShowAddTaskModal }) => {
  const { db, user } = useAuthContext();

  const [addTaskModalInput, setAddTaskModalInput] = useState(addTaskModalInputDefault);

  const formatInput = (e) => {
    let value = e.target.value;

    if (value.length === 1) {
      value = "0" + value;
    }
    if (value.length >= 3) {
      value = value.slice(1);
    }

    return value;
  };

  const validateInput = (e) => {
    const value = e.target.value;
    if (!value.match(numbersRegex)) {
      return false;
    }

    if (parseInt(value) >= 60) {
      return false;
    }

    return true;
  };

  const handleAddTask = async () => {
    if (!validFormInput()) {
      return;
    }

    const docRef = doc(db, `users/${user.uid}`);
    const userSnapshot = await getDoc(docRef);
    if (userSnapshot.exists()) {
      const { focusTime, breakTime, taskName, sessions } = addTaskModalInput;
      let newTask = {
        id: uuid(),
        title: taskName,
        focusTime:
          parseInt(focusTime.hr) * 3600 + parseInt(focusTime.min) * 60 + parseInt(focusTime.sec),
        breakTime:
          parseInt(breakTime.hr) * 3600 + parseInt(breakTime.min) * 60 + parseInt(breakTime.sec),
        sessions: sessions,
        progress: 0,
        currentMode: "Focus",
        currentSession: 1,
      };

      let userData = {
        pomodoroTasks: userSnapshot.data()?.pomodoroTasks
          ? [...userSnapshot.data().pomodoroTasks, newTask]
          : [newTask],
      };

      try {
        await updateDoc(docRef, userData);
        setShowAddTaskModal(false);
        setAddTaskModalInput(addTaskModalInputDefault);
      } catch (error) {
        console.log("Error adding new pomodoro task: ", error);
      }
    }
  };

  const validFormInput = () => {
    if (addTaskModalInput.taskName.trim().length <= 0) {
      return false;
    } else if (
      parseInt(addTaskModalInput.breakTime.hr) <= 0 &&
      parseInt(addTaskModalInput.breakTime.min) <= 0 &&
      parseInt(addTaskModalInput.breakTime.sec) <= 0
    ) {
      return false;
    } else if (
      parseInt(addTaskModalInput.focusTime.hr) <= 0 &&
      parseInt(addTaskModalInput.focusTime.min) <= 0 &&
      parseInt(addTaskModalInput.focusTime.sec) <= 0
    ) {
      return false;
    }
    return true;
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: "auto",
        zIndex: 10,
      }}
    >
      <div className="--widget-container melofi__addTaskModal">
        <div>
          <p>Task Name</p>
          <input
            type="text"
            placeholder="Task Name"
            value={addTaskModalInput.taskName}
            onChange={(e) =>
              setAddTaskModalInput((prev) => {
                return { ...prev, taskName: e.target.value };
              })
            }
          />
        </div>
        <div>
          {" "}
          <div style={{ display: "flex", alignItems: "center", columnGap: 5 }}>
            <RxTimer size={20} color="var(--color-effect)" />
            <p>Focus Time</p>
          </div>
          <div className="melofi__addTaskModal_timeInputContainer">
            <input
              type="text"
              placeholder="00"
              value={addTaskModalInput.focusTime.hr}
              onChange={(e) => {
                if (validateInput(e)) {
                  setAddTaskModalInput((prev) => {
                    return { ...prev, focusTime: { ...prev.focusTime, hr: formatInput(e) } };
                  });
                }
              }}
            />
            <p>:</p>
            <input
              type="text"
              placeholder="00"
              value={addTaskModalInput.focusTime.min}
              onChange={(e) => {
                {
                  if (validateInput(e)) {
                    setAddTaskModalInput((prev) => {
                      return { ...prev, focusTime: { ...prev.focusTime, min: formatInput(e) } };
                    });
                  }
                }
              }}
            />
            <p>:</p>
            <input
              type="text"
              placeholder="00"
              value={addTaskModalInput.focusTime.sec}
              onChange={(e) => {
                if (validateInput(e)) {
                  setAddTaskModalInput((prev) => {
                    return { ...prev, focusTime: { ...prev.focusTime, sec: formatInput(e) } };
                  });
                }
              }}
            />
          </div>
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", columnGap: 5 }}>
            <BsLightningCharge size={20} color="var(--color-effect)" />
            <p>Break Time</p>
          </div>
          <div className="melofi__addTaskModal_timeInputContainer">
            <input
              type="text"
              placeholder="00"
              value={addTaskModalInput.breakTime.hr}
              onChange={(e) => {
                if (validateInput(e)) {
                  setAddTaskModalInput((prev) => {
                    return { ...prev, breakTime: { ...prev.breakTime, hr: formatInput(e) } };
                  });
                }
              }}
            />
            <p>:</p>
            <input
              type="text"
              placeholder="00"
              value={addTaskModalInput.breakTime.min}
              onChange={(e) => {
                if (validateInput(e)) {
                  setAddTaskModalInput((prev) => {
                    return { ...prev, breakTime: { ...prev.breakTime, min: formatInput(e) } };
                  });
                }
              }}
            />
            <p>:</p>
            <input
              type="text"
              placeholder="00"
              value={addTaskModalInput.breakTime.sec}
              onChange={(e) => {
                if (validateInput(e)) {
                  setAddTaskModalInput((prev) => {
                    return { ...prev, breakTime: { ...prev.breakTime, sec: formatInput(e) } };
                  });
                }
              }}
            />
          </div>
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", columnGap: 5 }}>
            <BsArrowRepeat size={20} color="var(--color-effect)" />
            <p>Sessions</p>
          </div>
          <div className="melofi__addTaskModal_timeInputContainer">
            <input
              style={{ width: 50 }}
              type="number"
              placeholder={1}
              value={addTaskModalInput.sessions}
              max={10}
              min={1}
              onChange={(e) =>
                setAddTaskModalInput((prev) => {
                  return { ...prev, sessions: e.target.value };
                })
              }
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p
            style={{ cursor: "pointer", color: "var(--color-secondary)" }}
            onClick={() => {
              setShowAddTaskModal(false);
              setAddTaskModalInput("");
            }}
          >
            Cancel
          </p>
          <p
            style={{ cursor: "pointer", color: "var(--color-effect-opacity)" }}
            onClick={handleAddTask}
          >
            Add
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;

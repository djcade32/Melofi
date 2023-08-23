import React, { useEffect, useRef, useState } from "react";
import "./pomodoroTask.css";
import { RxTimer, BsLightningCharge, BsArrowRepeat, MdDelete } from "../../imports/icons";
import { LinearProgress, linearProgressClasses } from "@mui/material";
import { useAppContext } from "../../context/AppContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthContext } from "../../context/AuthContext";

const PomodoroTask = ({ task }) => {
  const { selectedPomodoroTask, setSelectedPomodoroTask } = useAppContext();
  const { user, db } = useAuthContext();

  const [isCurrentTask, setIsCurrentTask] = useState(false);

  const { title, focusTime, breakTime, sessions, progress, id } = task;

  useEffect(() => {
    if (selectedPomodoroTask) {
      setIsCurrentTask(selectedPomodoroTask.id === id);
    } else {
      setIsCurrentTask(false);
    }
  }, [selectedPomodoroTask]);

  function formatSecondsToHoursAndMinutes(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    const hoursString = hours > 0 ? `${hours} hr` : "";
    const minutesString = minutes > 0 ? `${minutes} min` : "";

    const formattedTime = [hoursString, minutesString].filter(Boolean).join(" ");

    return formattedTime || "0 min";
  }

  const handleSelect = () => {
    if (!isCurrentTask) {
      setSelectedPomodoroTask(task);
    } else {
      setSelectedPomodoroTask(null);
    }
  };

  const handleDeleteTemplate = async () => {
    const docRef = doc(db, `users/${user.uid}`);
    const userSnapshot = await getDoc(docRef);
    if (userSnapshot.exists()) {
      let newTasks = userSnapshot.data().pomodoroTasks.filter(({ id }) => id !== task.id);
      let userData = {
        pomodoroTasks: newTasks,
      };

      try {
        await updateDoc(docRef, userData);
      } catch (error) {
        console.log(`Error deleting ${title} task: `, error);
      }
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        className="melofi__pomodoroTask"
        onClick={handleSelect}
        style={{
          border: isCurrentTask
            ? "1px solid var(--color-effect-opacity)"
            : "1px solid var(--color-secondary)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", columnGap: 10 }}>
          <p style={{ textDecoration: Math.round(progress) >= 100 && "line-through" }}>{title}</p>
          {isCurrentTask ? (
            Math.round(progress) >= 100 ? (
              <div className="melofi__pomodoroTask_inProgressContainer">
                <p>Complete</p>
              </div>
            ) : (
              <div className="melofi__pomodoroTask_inProgressContainer">
                <p>In Progress</p>
              </div>
            )
          ) : (
            Math.round(progress) >= 100 && (
              <div className="melofi__pomodoroTask_inProgressContainer">
                <p>Complete</p>
              </div>
            )
          )}
        </div>
        <div style={{ display: "flex", width: "100%", alignItems: "center", columnGap: 10 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              width: "100%",
              borderRadius: 10,
              [`&.${linearProgressClasses.colorPrimary}`]: {
                backgroundColor: "var(--color-secondary)",
              },
              [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: "var(--color-effect-opacity)",
              },
            }}
          />
          <p style={{ fontSize: 14 }}>{progress > 100 ? 100 : Math.round(progress)}%</p>
        </div>
        <div className="melofi__pomodoroTask_statContainer">
          <div className="melofi__pomodoroTask_statContainer_stat">
            <RxTimer size={20} color="var(--color-effect-opacity)" />
            <p>{formatSecondsToHoursAndMinutes(focusTime)}</p>
          </div>
          <div className="melofi__pomodoroTask_statContainer_stat">
            <BsLightningCharge size={20} color="var(--color-effect-opacity)" />
            <p>{formatSecondsToHoursAndMinutes(breakTime)}</p>
          </div>
          <div className="melofi__pomodoroTask_statContainer_stat">
            <BsArrowRepeat size={20} color="var(--color-effect-opacity)" />
            <p>{sessions}</p>
          </div>
        </div>
      </div>
      <div className="melofi__pomodoroTask_deleteIcon">
        <MdDelete
          onMouseOver={({ target }) => (target.style.color = "white")}
          onMouseOut={({ target }) => (target.style.color = "var(--color-secondary")}
          size={22}
          color="var(--color-secondary"
          onClick={handleDeleteTemplate}
        />
      </div>
    </div>
  );
};

export default PomodoroTask;

import { useState, useEffect, useRef } from "react";
import { getTimerWorkerUrl } from "../../scripts/worker-script";
import "./timerWidget.css";
import { useAppContext } from "../../context/AppContext";
import Draggable from "react-draggable";
import { isSafariBrowser } from "../../helpers/browser";
import { IoCloseOutline, FaPlay, FaPause, VscDebugRestart, FiPlus } from "../../imports/icons";
import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";
import Tooltip from "../../components/tooltip/Tooltip";
import alarmSoundPath from "../../assets/timer_alarm.mp3";
import sessionAlarmSoundPath from "../../assets/timer_session_alarm.mp3";
import TransitionsModal from "../../components/transitionsModal/TransitionsModal";
import { useAuthContext } from "../../context/AuthContext";
import PomodoroTask from "./PomodoroTask";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AddTaskModal from "./AddTaskModal";
import usePremiumStatus from "../../../stripe/usePremiumStatus";

const iconProps = {
  size: 33,
  color: "white",
  style: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    zIndex: 10,
  },
};
const worker = new Worker(getTimerWorkerUrl());

const numbersRegex = /^[0-9]+$/;

const fakePomodoroTask = [
  {
    id: 0,
    title: "Study",
    breakTime: 900,
    focusTime: 3600,
    progress: 70,
    sessions: 3,
  },
  {
    id: 1,
    title: "Work on Proposal",
    breakTime: 600,
    focusTime: 2700,
    progress: 40,
    sessions: 4,
  },
];

export default function TimerWidget() {
  const nodeRef = useRef(null);
  const timerAudioRef = useRef(null);
  const sessionAudioRef = useRef(null);

  const { user, db, userData } = useAuthContext();
  const {
    setShowTimer,
    showTimer,
    settingsConfig,
    incrementFocusedTime,
    selectedPomodoroTask,
    setShowAuthModal,
  } = useAppContext();

  const userIsPremium = usePremiumStatus(user);

  const [webWorkerTime, setWebWorkerTime] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(45);
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [originalTime, setOriginalTime] = useState(0);
  const [pomodoroTasks, setPomodoroTasks] = useState([]);
  const [currentSessionNum, setCurrentSessionNum] = useState(1);
  const [currentMode, setCurrentMode] = useState("Focus");
  const [taskInProgress, setTaskInProgress] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  useEffect(() => {
    if (user) {
      getPomodoroTasks();
    }
    worker.onmessage = ({ data: { time } }) => {
      setWebWorkerTime(time);
    };
  }, [userData]);

  useEffect(() => {
    let calculatedSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    setWebWorkerTime(calculatedSeconds);
  }, [hours, minutes, seconds]);

  useEffect(() => {
    if (isRunning) {
      const increment = (100 - progress) / Math.abs(webWorkerTime);
      setHours(Math.abs(webWorkerTime / 3600));
      setMinutes(Math.abs(webWorkerTime / 60));
      setSeconds(Math.abs(webWorkerTime % 60));
      setProgress((prev) => (prev >= 100 ? 100 : prev + increment));
    }
    if (progress >= 100) {
      handleTimerExpired();
    }
  }, [webWorkerTime]);

  useEffect(() => {
    // This is for if task is switched while in the process of completing another task
    if (taskInProgress) {
      setProgress(0);
      setIsRunning(false);
      worker.postMessage({ turn: "off", timeInput: originalTime });
      setTaskInProgress(false);
    }
    if (selectedPomodoroTask) {
      setHours(selectedPomodoroTask.focusTime / 3600);
      setMinutes(selectedPomodoroTask.focusTime / 60);
      setSeconds(selectedPomodoroTask.focusTime % 60);
      setCurrentSessionNum(selectedPomodoroTask.currentSession);
      setCurrentMode(selectedPomodoroTask.currentMode);
    }
  }, [selectedPomodoroTask]);

  useEffect(() => {
    if (selectedPomodoroTask && taskInProgress) {
      setTimeout(() => {
        startWebWorkerTimer();
      }, 1500);
    }
  }, [currentMode]);

  const startWebWorkerTimer = () => {
    setIsRunning(true);
    worker.postMessage({ turn: "on", timeInput: webWorkerTime });
    setOriginalTime(webWorkerTime);
  };

  const pauseWorkerTimer = () => {
    setIsRunning(false);
    worker.postMessage({ turn: "off", timeInput: webWorkerTime });
  };

  const resetWebWorkerTimer = () => {
    setProgress(0);
    setIsRunning(false);
    let resetValue = originalTime;
    worker.postMessage({ turn: "off", timeInput: resetValue });
    setHours(0);
    setMinutes(originalTime / 60);
    setSeconds(0);
    setOriginalTime(0);
    setWebWorkerTime(resetValue);
  };

  const increasePomodoroTaskProgress = async (newMode, newSession) => {
    const newPomodoroTasksList = [];
    pomodoroTasks.map((task) => {
      if (task.id === selectedPomodoroTask.id) {
        const incrementBy = (1 / (selectedPomodoroTask.sessions * 2 - 1)) * 100;

        const newPomodoTaskObject = {
          ...task,
          progress: task.progress + incrementBy,
          currentSession: newSession ? task.currentSession + 1 : task.currentSession,
          currentMode: newMode || "Focus",
        };
        newPomodoroTasksList.push(newPomodoTaskObject);
      } else {
        newPomodoroTasksList.push(task);
      }
    });

    setPomodoroTasks(newPomodoroTasksList);
    const docRef = doc(db, `users/${user.uid}`);
    const userSnapshot = await getDoc(docRef);
    if (userSnapshot.exists()) {
      let userData = {
        pomodoroTasks: newPomodoroTasksList,
      };
      try {
        await updateDoc(docRef, userData);
      } catch (error) {
        console.log("Error updating pomodoro task progress: ", error);
      }
    }
  };

  const switchModes = (newMode, time, newSession) => {
    setCurrentMode(newMode);
    setProgress(0);
    setIsRunning(false);
    worker.postMessage({ turn: "off", timeInput: webWorkerTime });
    setHours(time / 3600);
    setMinutes(time / 60);
    setSeconds(time % 60);
    setWebWorkerTime(time);
    increasePomodoroTaskProgress(newMode, newSession);
    if (user) {
      incrementFocusedTime(originalTime * 100);
    }
  };

  const handleTimerExpired = () => {
    if (selectedPomodoroTask) {
      if (currentMode === "Focus" && currentSessionNum < selectedPomodoroTask.sessions) {
        switchModes("Break", selectedPomodoroTask.breakTime, false);
        sessionAudioRef.current.play();
      } else if (currentMode === "Break" && currentSessionNum < selectedPomodoroTask.sessions) {
        switchModes("Focus", selectedPomodoroTask.focusTime, true);
        setCurrentSessionNum((prev) => prev + 1);
        sessionAudioRef.current.play();
      } else {
        resetWebWorkerTimer();
        setCurrentSessionNum(1);
        if (settingsConfig.playTimerSound) {
          timerAudioRef.current.play();
        }
        setModalOpened(true);

        increasePomodoroTaskProgress();
        setTaskInProgress(false);
      }
      return;
    }

    resetWebWorkerTimer();
    if (settingsConfig.playTimerSound) {
      timerAudioRef.current.play();
    }
    setModalOpened(true);
    if (user) {
      incrementFocusedTime(originalTime * 100);
    }
  };

  const onClose = () => {
    setModalOpened(false);
    timerAudioRef.current.pause();
    timerAudioRef.current.currentTime = 0;
  };

  const handleHoursChanged = (e) => {
    let value = e.target.value;

    if (!value.match(numbersRegex)) {
      return;
    }
    if (parseInt(value) === 0 && value.length === 3) {
      return;
    }
    if (value.length >= 3) {
      value = value.slice(1);
    }
    setHours(parseInt(value));
  };

  const handleMinutesChanged = (e) => {
    let value = e.target.value;

    if (!value.match(numbersRegex) || value >= 60) {
      return;
    }
    if (parseInt(value) === 0 && value.length === 3) {
      return;
    }
    if (value.length >= 4) {
      value = value.slice(1);
    }
    setMinutes(parseInt(value));
  };

  const handleSecondsChanged = (e) => {
    let value = e.target.value;
    if (!value.match(numbersRegex) || value >= 60) {
      return;
    }
    if (value.length >= 3) {
      value = value.slice(1);
    }
    setSeconds(parseInt(value));
  };

  const getPomodoroTasks = async () => {
    const docRef = doc(db, `users/${user.uid}`);
    try {
      const userSnapshot = await getDoc(docRef);
      if (userSnapshot.exists()) {
        setPomodoroTasks(userSnapshot.data().pomodoroTasks);
      }
    } catch (error) {
      console.log("Error fetching user pomodoroTasks: ", error);
    }
  };

  return (
    <Draggable nodeRef={nodeRef} bounds={isSafariBrowser() ? "" : ".fullscreen"} handle="#handle">
      <div
        className="--widget-container melofi__timer"
        ref={nodeRef}
        style={{ display: showTimer ? "flex" : "none" }}
      >
        <audio ref={timerAudioRef} src={alarmSoundPath} typeof="audio/mpeg" loop />
        <audio ref={sessionAudioRef} src={sessionAlarmSoundPath} typeof="audio/mpeg" />
        <TransitionsModal onClose={onClose} isOpen={modalOpened} />
        <div id="handle" className="melofi__timer_handle" />
        <div className="melofi__timer_header">
          <Tooltip text="Reset">
            <VscDebugRestart
              size={33}
              color="var(--color-secondary)"
              onClick={resetWebWorkerTimer}
              cursor={"pointer"}
              style={{ zIndex: 10 }}
            />
          </Tooltip>
          <IoCloseOutline
            size={33}
            color="var(--color-secondary)"
            onClick={() => setShowTimer(false)}
            cursor={"pointer"}
            style={{ zIndex: 10 }}
          />
        </div>
        <div className="melofi__timer_content" style={{ opacity: showAddTaskModal ? 0.4 : 1 }}>
          <div className="melofi__timer_content_timeSide">
            <div className="melofi__timer_content_timeSide_circularProgressContainer">
              <div>
                {isRunning ? (
                  <FaPause {...iconProps} onClick={() => pauseWorkerTimer()} cursor={"pointer"} />
                ) : (
                  <FaPlay
                    {...iconProps}
                    onClick={() => {
                      if (webWorkerTime === 0) {
                        return;
                      }
                      if (selectedPomodoroTask && selectedPomodoroTask.progress >= 100) {
                        return;
                      }
                      startWebWorkerTimer();
                      setIsRunning(true);
                      setTaskInProgress(true);
                    }}
                    cursor={"pointer"}
                  />
                )}
              </div>
              <CircularProgress
                size={150}
                value={progress}
                thickness={1.5}
                variant="determinate"
                sx={{
                  color:
                    currentMode === "Focus" || ""
                      ? "var(--color-effect-opacity)"
                      : "var(--color-secondary)",
                  [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: "round",
                  },
                }}
              />
            </div>
            <div className="melofi__timer_content_timeSide_inputsContainer">
              <input
                type="text"
                value={Math.floor(webWorkerTime / 3600)
                  .toString()
                  .padStart(2, "0")}
                onChange={handleHoursChanged}
                disabled={isRunning}
              />
              <p>:</p>
              <input
                type="text"
                value={
                  webWorkerTime / 60 === 60
                    ? "00"
                    : Math.floor((webWorkerTime % 3600) / 60)
                        .toString()
                        .padStart(2, "0")
                }
                onChange={handleMinutesChanged}
                disabled={isRunning}
              />
              <p>:</p>
              <input
                type="text"
                value={Math.floor(webWorkerTime % 60)
                  .toString()
                  .padStart(2, "0")}
                onChange={handleSecondsChanged}
                disabled={isRunning}
              />
            </div>
            <div
              style={{
                height: 100,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: !selectedPomodoroTask && "center",
              }}
            >
              {selectedPomodoroTask ? (
                selectedPomodoroTask.progress >= 100 ? (
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-primary)",
                        color: "var(--color-primary)",
                        fontSize: 21,
                        textAlign: "center",
                        backgroundColor: "var(--color-effect)",
                        borderRadius: 10,
                      }}
                    >
                      Complete
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="melofi__timer_content_timeSide_currentModeContainer">
                      <p
                        style={{
                          backgroundColor:
                            currentMode === "Focus"
                              ? "var(--color-effect-opacity)"
                              : "var(--color-secondary)",
                        }}
                      >
                        {currentMode}
                      </p>
                    </div>
                    <p className="melofi__timer_content_timeSide_session">
                      Session{" "}
                      <span style={{ color: "var(--color-effect-opacity)" }}>
                        {currentSessionNum}
                      </span>
                    </p>
                  </>
                )
              ) : (
                <>
                  <p
                    style={{
                      fontFamily: "var(--font-primary)",
                      color: "var(--color-secondary)",
                      fontSize: 18,
                      textAlign: "center",
                    }}
                  >
                    No Task
                    <br />
                    In Progress
                  </p>
                </>
              )}
            </div>
          </div>
          <div style={{ position: "relative", display: "flex" }}>
            {!user && (
              <div className="melofi__timer_premium_banner">
                <div
                  className="melofi__premium_button"
                  // onClick={() => createCheckoutSession(user.uid)}
                  onClick={() => setShowAuthModal(true)}
                >
                  {/* <p>Go Premium</p> */}
                  <p>Log In | Sign Up</p>
                </div>
                <p style={{ width: "50%", textAlign: "center", fontSize: 16, lineHeight: 1.75 }}>
                  to use the pomodoro task feature.
                </p>
              </div>
            )}
            <div className="melofi__timer_content_taskSide">
              {!user
                ? fakePomodoroTask.map((task, index) => <PomodoroTask key={index} task={task} />)
                : pomodoroTasks.map((task, index) => <PomodoroTask key={index} task={task} />)}
              <div className="melofi__timer_addButton" onClick={() => setShowAddTaskModal(true)}>
                <Tooltip text="Add task">
                  <FiPlus
                    size={33}
                    color="white"
                    style={{
                      backgroundColor: "var(--color-secondary)",
                      padding: 3,
                      borderRadius: "100%",
                      cursor: "pointer",
                      zIndex: 10,
                      outline: "1px solid var(--color-secondary)",
                    }}
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        {showAddTaskModal && <AddTaskModal setShowAddTaskModal={setShowAddTaskModal} />}
      </div>
    </Draggable>
  );
}

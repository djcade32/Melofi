import { useState, useEffect, useRef } from "react";
import { getTimerWorkerUrl, timerWorker } from "./worker-script";
import "./timerWidget.css";
import { useAppContext } from "../../context/AppContext";
import Draggable from "react-draggable";
import { isSafariBrowser } from "../../helpers/browser";
import {
  IoCloseOutline,
  FaPlay,
  FaPause,
  RxCaretRight,
  RxCaretLeft,
  RxReset,
} from "../../imports/icons";
import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";
import Tooltip from "../../components/tooltip/Tooltip";
import alarmSoundPath from "../../assets/timer_alarm.mp3";
import TransitionsModal from "../../components/transitionsModal/TransitionsModal";

const iconProps = {
  size: 50,
  color: "white",
  style: {
    cursor: "pointer",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    zIndex: 1,
  },
};
const worker = new Worker(getTimerWorkerUrl());

export default function TimerWidget() {
  const nodeRef = useRef(null);
  const audioRef = useRef(null);

  const { setShowTimer, showTimer } = useAppContext();

  const [webWorkerTime, setWebWorkerTime] = useState(0);
  const [timeInput, setTimeInput] = useState(3600);
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    worker.onmessage = ({ data: { time } }) => {
      setWebWorkerTime(time);
    };
  }, []);

  useEffect(() => {
    setWebWorkerTime(timeInput * 1000);
  }, [timeInput]);

  useEffect(() => {
    if (isRunning) {
      const millisecondsToSeconds = webWorkerTime / 1000;
      const increment = (100 - progress) / millisecondsToSeconds;
      setProgress((prev) => (prev >= 100 ? handleTimerExpired() : prev + increment));
    }
  }, [webWorkerTime]);

  const startWebWorkerTimer = () => {
    setIsRunning(true);
    worker.postMessage({ turn: "on", timeInput: webWorkerTime });
  };

  const pauseWorkerTimer = () => {
    setIsRunning(false);
    worker.postMessage({ turn: "off", timeInput: webWorkerTime });
  };

  const resetWebWorkerTimer = () => {
    setProgress(0);
    setIsRunning(false);
    worker.postMessage({ turn: "off", timeInput: 3600 * 1000 });
    setWebWorkerTime(3600 * 1000);
  };

  const handleTimeIncrement = (value) => {
    setProgress(0);
    let calculatedTime = webWorkerTime / 1000 + value * 60;
    if (calculatedTime < 0 || calculatedTime > 10800) {
      return;
    }
    setTimeInput(calculatedTime);
  };

  const handleTimerExpired = () => {
    resetWebWorkerTimer();
    audioRef.current.play();
    setModalOpened(true);
  };

  const onClose = () => {
    setModalOpened(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <Draggable nodeRef={nodeRef} bounds={isSafariBrowser() ? "" : ".fullscreen"} handle="#handle">
      <div className="melofi__timer" ref={nodeRef} style={{ display: showTimer ? "flex" : "none" }}>
        <audio ref={audioRef} src={alarmSoundPath} loop />
        <TransitionsModal onClose={onClose} isOpen={modalOpened} />
        <div id="handle" className="melofi__timer_handle">
          <Tooltip text="Reset">
            <RxReset
              size={33}
              color="var(--color-secondary)"
              onClick={resetWebWorkerTimer}
              cursor={"pointer"}
              style={{ marginLeft: 10, marginTop: 10 }}
            />
          </Tooltip>
          <IoCloseOutline
            size={33}
            color="var(--color-secondary)"
            onClick={() => setShowTimer(false)}
            cursor={"pointer"}
            style={{ marginRight: 10, marginTop: 10 }}
          />
        </div>
        <div style={{ position: "relative" }}>
          {isRunning ? (
            <FaPause {...iconProps} onClick={() => pauseWorkerTimer()} />
          ) : (
            <FaPlay
              {...iconProps}
              onClick={() => {
                if (timeInput == 0) {
                  return;
                }
                startWebWorkerTimer();
                setIsRunning(true);
              }}
            />
          )}

          <CircularProgress
            size={186}
            value={progress}
            thickness={3}
            variant="determinate"
            sx={{
              color: "var(--color-effect-opacity)",
              [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: "round",
              },
            }}
          />
        </div>
        <div className="melofi__timer_time">
          <RxCaretLeft
            size={45}
            color="var(--color-secondary)"
            cursor={"pointer"}
            onClick={() => handleTimeIncrement(-5)}
            display={isRunning ? "none" : "flex"}
          />
          <p>
            {Math.floor(webWorkerTime / 1000 / 60)}:
            {Math.floor((webWorkerTime / 1000) % 60)
              .toString()
              .padStart(2, "0")}
          </p>
          <RxCaretRight
            size={45}
            color="var(--color-secondary)"
            cursor={"pointer"}
            onClick={() => handleTimeIncrement(5)}
            display={isRunning ? "none" : "flex"}
          />
        </div>
      </div>
    </Draggable>
  );
}
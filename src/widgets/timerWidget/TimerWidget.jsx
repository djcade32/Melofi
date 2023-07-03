import { useState, useEffect, useRef } from "react";
import { getTimerWorkerUrl } from "./worker-script";
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

const numbersRegex = /^[0-9]+$/;

export default function TimerWidget() {
  const nodeRef = useRef(null);
  const audioRef = useRef(null);

  const { setShowTimer, showTimer } = useAppContext();

  const [webWorkerTime, setWebWorkerTime] = useState(0);
  const [minutes, setMinutes] = useState(60);
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    worker.onmessage = ({ data: { time } }) => {
      setWebWorkerTime(time);
    };
  }, []);

  useEffect(() => {
    let calculatedSeconds = parseInt(minutes) * 60 + parseInt(seconds);
    setWebWorkerTime(calculatedSeconds);
  }, [minutes, seconds]);

  useEffect(() => {
    if (isRunning) {
      const increment = (100 - progress) / webWorkerTime;
      setMinutes(webWorkerTime / 60);
      setSeconds(webWorkerTime % 60);
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
    let resetValue = 3600;
    worker.postMessage({ turn: "off", timeInput: resetValue });
    setMinutes(60);
    setSeconds(0);
    setWebWorkerTime(resetValue);
  };

  const handleTimeIncrement = (value) => {
    setProgress(0);
    let newValue = parseInt(minutes) + value;
    if (newValue < 0 || newValue > 999) {
      return;
    }
    setMinutes(newValue);
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

  const handleMinutesChanged = (e) => {
    let value = e.target.value;

    if (!value.match(numbersRegex)) {
      return;
    }
    if (parseInt(value) === 0 && value.length === 3) {
      return;
    }
    if (value.length >= 4) {
      value = value.slice(1);
    }
    setMinutes(value);
  };
  const handleSecondsChanged = (e) => {
    let value = e.target.value;
    if (!value.match(numbersRegex)) {
      return;
    }
    if (value.length >= 3) {
      value = value.slice(1);
    }
    setSeconds(value);
  };

  return (
    <Draggable nodeRef={nodeRef} bounds={isSafariBrowser() ? "" : ".fullscreen"} handle="#handle">
      <div
        className="--widget-container melofi__timer"
        ref={nodeRef}
        style={{ display: showTimer ? "flex" : "none" }}
      >
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
                if (webWorkerTime === 0) {
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
          <div className="melofi__timer_time_inputs">
            <input
              type="text"
              value={
                webWorkerTime / 60 > 999
                  ? 999
                  : Math.floor(webWorkerTime / 60)
                      .toString()
                      .padStart(2, "0")
              }
              onChange={handleMinutesChanged}
              onBlur={(e) => {
                const minutes = e.target.value;
                if (parseInt(minutes) < 100 && minutes.length > 2) {
                  setMinutes(minutes.slice(1));
                }
              }}
              style={minutes.length === 3 && parseInt(minutes) > 100 ? { width: 90 } : {}}
            />
            <p>:</p>
            <input
              type="text"
              value={Math.floor(webWorkerTime % 60)
                .toString()
                .padStart(2, "0")}
              onChange={handleSecondsChanged}
            />
          </div>
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

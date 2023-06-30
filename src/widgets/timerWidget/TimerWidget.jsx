import React, { useEffect, useRef, useState } from "react";
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

const TimerWidget = () => {
  const nodeRef = useRef(null);
  const audioRef = useRef(null);

  const { setShowTimer, showTimer } = useAppContext();
  const [minutes, setMinutes] = useState(60);
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  let timer;
  useEffect(() => {
    if (timerActive) {
      timer = setInterval(() => {
        setSeconds((prevSecs) => {
          if (prevSecs <= 0) {
            setMinutes((prevMins) => prevMins - 1);
            return 59;
          }
          return prevSecs - 1;
        });
        const calculatedSeconds = minutes * 60 + seconds;
        const increment = 100 / calculatedSeconds;
        setProgress((prevProgress) =>
          prevProgress >= 100 ? handleTimerExpired() : prevProgress + increment
        );
      }, [1000]);
      return () => {
        clearInterval(timer);
      };
    }
  }, [timerActive]);

  const handleTimeIncrement = (value) => {
    setProgress(0);
    clearInterval(timer);
    let minutesNum = minutes + value;
    if (minutesNum < 0 || minutesNum > 180) {
      return;
    }
    setMinutes(minutesNum);
  };

  const handleReset = () => {
    setProgress(0);
    setMinutes(60);
    setSeconds(0);
    clearInterval(timer);
    setTimerActive(false);
  };

  const handleTimerExpired = () => {
    handleReset();
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
              onClick={handleReset}
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
          {timerActive ? (
            <FaPause {...iconProps} onClick={() => setTimerActive(false)} />
          ) : (
            <FaPlay
              {...iconProps}
              onClick={() => {
                if (minutes === 0 && seconds === 0) {
                  return;
                }
                setTimerActive(true);
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
            display={timerActive ? "none" : "flex"}
          />
          <p>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </p>
          <RxCaretRight
            size={45}
            color="var(--color-secondary)"
            cursor={"pointer"}
            onClick={() => handleTimeIncrement(5)}
            display={timerActive ? "none" : "flex"}
          />
        </div>
      </div>
    </Draggable>
  );
};

export default TimerWidget;

import React, { useState, useEffect } from "react";
import "./App.css";

import logo from "./assets/logo.png";

import { useAppContext } from "./context/AppContext";
import { RiFullscreenFill, RiFullscreenExitLine, GiTacos } from "./imports/icons";

import { FullScreen, useFullScreenHandle } from "react-full-screen";

import MusicControls from "./components/musicControls/MusicControls";
import Clock from "./components/clock/Clock";
import NowPlaying from "./components/nowPlaying/NowPlaying";
import SceneBg from "./components/sceneBg/SceneBg";
import Tooltip from "./components/tooltip/Tooltip";
import ToolsMenu from "./components/tools/ToolsMenu";
import Menu from "./components/menu/Menu";
import Settings from "./modals/settings/Settings";
// import GenreDropdown from "./components/genreDropdown/GenreDropdown";

// Import modals
import AboutMelofi from "./modals/aboutMelofi/AboutMelofi";
import MixerButton from "./modals/mixer/MixerButton";
import MixerModal from "./modals/mixer/MixerModal";
import SceneButton from "./modals/scene/SceneButton";
import SceneModal from "./modals/scene/SceneModal";

// Import widgets
import CalendarWidget from "./widgets/calendarWidget/CalendarWidget";
import StickyNoteWidget from "./widgets/stickyNoteWidget/StickyNoteWidget";
import TimerWidget from "./widgets/timerWidget/TimerWidget";
import ToDoListWidget from "./widgets/toDoListWidget/ToDoListWidget";
import MobileView from "./MobileView";

function App() {
  const { allStickyNotes } = useAppContext();
  const [isSleep, setIsSleep] = useState(false);
  const [onMobileDevice, setOnMobileDevice] = useState(window.innerWidth < 750 ? true : false);

  const handle = useFullScreenHandle();

  const handleFullscreen = () => {
    if (handle.active) {
      handle.exit();
    } else {
      handle.enter();
    }
  };

  // Determine when UI should go to sleep
  let timeout;
  useEffect(() => {
    const onMouseMove = () => {
      setIsSleep(false);
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        if (JSON.parse(localStorage.getItem("settingsConfig")).hideInterface) {
          setIsSleep(true);
          return;
        }
        clearTimeout(timeout);
      }, 15000);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseMove);
    };
  }, []);

  // Determines when show 'Melofi is not availble on Mobile'
  useEffect(() => {
    const updateDimension = () => {
      if (window.innerWidth < 750) {
        setOnMobileDevice(true);
      } else if (window.innerWidth > 750) {
        setOnMobileDevice(false);
      }
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, []);

  return (
    <FullScreen handle={handle}>
      {!onMobileDevice ? (
        <div className="App" id="app" style={isSleep ? { cursor: "none" } : {}}>
          <SceneBg />

          {/* Header */}
          <div
            className="melofi__header"
            style={
              isSleep
                ? { animation: "slide-up 0.4s forwards" }
                : { animation: "slide-down 0.4s forwards" }
            }
          >
            <nav id="nav" className="melofi__nav">
              <div className="melofi__logo">
                <img src={logo} alt="melofi logo" />
              </div>

              <div className="melofi__rightSide">
                {/* GenreDropdown will be a future feature */}
                {/* <GenreDropdown /> */}
                <MixerButton />
                <MusicControls />
                <SceneButton />
                <ToolsMenu isSleep={isSleep} />
                <Tooltip text={handle.active ? "Exit full screen" : "Enter full screen"}>
                  <div
                    className="melofi__fullscreen-button"
                    onClick={handleFullscreen}
                    style={handle.active ? { outline: "1px solid rgba(254, 165, 57, 0.88)" } : {}}
                  >
                    {handle.active ? (
                      <RiFullscreenExitLine size={20} color="white" />
                    ) : (
                      <RiFullscreenFill size={20} color="white" />
                    )}
                  </div>
                </Tooltip>
                <Clock />
                <Menu isSleep={isSleep} />
              </div>
            </nav>
          </div>

          <MixerModal />
          <SceneModal />
          <ToDoListWidget />
          {allStickyNotes.map((note) => (
            <StickyNoteWidget key={note.id} note={note} />
          ))}
          <CalendarWidget />
          <TimerWidget />
          <Settings />
          <AboutMelofi />

          {/* Footer */}
          <div
            className="melofi__footer"
            style={
              isSleep
                ? { animation: "slide-footer-down 0.4s forwards" }
                : { animation: "slide-footer-up 0.4s forwards" }
            }
          >
            <NowPlaying />
            <div className="melofi__buyMeATacoLink">
              <div>
                <GiTacos size={30} color="var(--color-secondary-white)" />
                <a href="https://bmc.link/normancade" target="_blank">
                  Support the creator
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <MobileView />
      )}
    </FullScreen>
  );
}

export default App;

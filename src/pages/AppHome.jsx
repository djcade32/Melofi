import React, { useState, useEffect, useRef } from "react";
import "./appHome.css";

import logo from "../assets/logo.png";
import notificationSound from "../assets/notification_sound.mp3";

import { useAppContext } from "../context/AppContext";
import { RiFullscreenFill, RiFullscreenExitLine, GiTacos } from "../imports/icons";

import { FullScreen, useFullScreenHandle } from "react-full-screen";

import MusicControls from "../components/musicControls/MusicControls";
import Clock from "../components/clock/Clock";
import NowPlaying from "../components/nowPlaying/NowPlaying";
import SceneBg from "../components/sceneBg/SceneBg";
import Tooltip from "../components/tooltip/Tooltip";
import ToolsMenu from "../components/tools/ToolsMenu";
import Menu from "../components/menu/Menu";
import Settings from "../modals/settings/Settings";
import NewFeature from "../components/newFeature/newFeature";
// import GenreDropdown from "./components/genreDropdown/GenreDropdown";

// Import modals
const AboutMelofi = React.lazy(() => import("../modals/aboutMelofi/AboutMelofi"));
const MixerButton = React.lazy(() => import("../modals/mixer/MixerButton"));
const MixerModal = React.lazy(() => import("../modals/mixer/MixerModal"));
const SceneButton = React.lazy(() => import("../modals/scene/SceneButton"));
const SceneModal = React.lazy(() => import("../modals/scene/SceneModal"));
const Account = React.lazy(() => import("../modals/account/Account"));

// Import widgets
import StickyNoteWidget from "../widgets/stickyNoteWidget/StickyNoteWidget";
import AuthModal from "../modals/auth/authModal/AuthModal";
import Toaster from "../components/toaster/Toaster";
const CalendarWidget = React.lazy(() => import("../widgets/calendarWidget/CalendarWidget"));
const TimerWidget = React.lazy(() => import("../widgets/timerWidget/TimerWidget"));
const ToDoListWidget = React.lazy(() => import("../widgets/toDoListWidget/ToDoListWidget"));
const MobileView = React.lazy(() => import("./MobileView"));

function AppHome() {
  const { allStickyNotes, usingSpotify, newAchievements } = useAppContext();

  const notificationSoundRef = useRef(null);

  const [isSleep, setIsSleep] = useState(false);
  const [onMobileDevice, setOnMobileDevice] = useState(window.innerWidth < 750 ? true : false);
  const [newToolPopupVisible, setNewToolPopupVisible] = useState(false);
  const [newMenuPopupVisible, setNewMenuPopupVisible] = useState(false);

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

  useEffect(() => {
    let new_tool_popup_status = localStorage.getItem("new_tool_popup_status");
    let new_menu_popup_status = localStorage.getItem("new_menu_popup_status");
    if (!new_tool_popup_status) {
      setNewToolPopupVisible(true);
      localStorage.setItem("new_tool_popup_status", true);
    }
    if (!new_menu_popup_status) {
      setNewMenuPopupVisible(true);
      localStorage.setItem("new_menu_popup_status", true);
    }
  }, []);

  useEffect(() => {
    if (newAchievements.length > 0) {
      notificationSoundRef.current.play();
    }
  }, [newAchievements]);

  return (
    <FullScreen handle={handle}>
      {!onMobileDevice ? (
        <div className="App" id="app" style={isSleep ? { cursor: "none" } : {}}>
          <SceneBg />
          <audio
            ref={notificationSoundRef}
            id="notification_sound"
            src={notificationSound}
            typeof="audio/mpeg"
          />

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
                {!usingSpotify && <MusicControls />}
                <SceneButton />
                <div style={{ position: "relative" }}>
                  {newToolPopupVisible && <NewFeature />}
                  <ToolsMenu
                    isSleep={isSleep}
                    newToolPopupVisible={newToolPopupVisible}
                    setNewToolPopupVisible={setNewToolPopupVisible}
                  />
                </div>
                <Tooltip text={handle.active ? "Exit full screen" : "Enter full screen"}>
                  <div
                    className="--nav-button"
                    onClick={handleFullscreen}
                    style={
                      handle.active ? { outline: "1px solid var(--color-effect-opacity)" } : {}
                    }
                  >
                    {handle.active ? (
                      <RiFullscreenExitLine size={20} color="white" />
                    ) : (
                      <RiFullscreenFill size={20} color="white" />
                    )}
                  </div>
                </Tooltip>
                <Clock />
                <div style={{ position: "relative" }}>
                  {newMenuPopupVisible && <NewFeature />}
                  <Menu
                    isSleep={isSleep}
                    setNewMenuPopupVisible={setNewMenuPopupVisible}
                    newMenuPopupVisible={newMenuPopupVisible}
                  />
                </div>
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
          <AuthModal />
          <Account />
          <Settings />
          <AboutMelofi />
          <Toaster />

          {/* Footer */}
          <div
            className="melofi__footer"
            style={
              isSleep
                ? { animation: "slide-footer-down 0.4s forwards" }
                : { animation: "slide-footer-up 0.4s forwards" }
            }
          >
            {!usingSpotify && <NowPlaying />}
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

export default AppHome;

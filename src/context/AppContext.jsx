import { createContext, useState, useContext, useEffect } from "react";
import { scenes } from "../data/scenes";
import { DEFAULT } from "../enums/colors";
import logo from "../assets/logo.png";

const AppContext = createContext({});

const AppContextProvider = (props) => {
  const [musicVolume, setMusicVolume] = useState(35);
  const [currentSongInfo, setCurrentSongInfo] = useState(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(null);
  const [showSceneModal, setShowSceneModal] = useState(false);
  const [showMixerModal, setShowMixerModal] = useState(false);
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const [showToDoList, setShowToDoList] = useState(false);
  const [allStickyNotes, setAllStickyNotes] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsConfig, setSettingsConfig] = useState(
    JSON.parse(localStorage.getItem("settingsConfig")) || {
      fadeAway: {
        todoList: true,
        calendar: true,
      },
      hideInterface: true,
      playTimerSound: true,
    }
  );
  const [showAboutMelofi, setShowAboutMelofi] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [usingSpotify, setUsingSpotify] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentSceneIndex(JSON.parse(localStorage.getItem("currentSceneIndex")) || 0);
    setAllStickyNotes(JSON.parse(localStorage.getItem("stickyNoteList")) || []);
  }, []);

  useEffect(() => {
    // Check if the page has already loaded
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", setLoading(false));
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", setLoading(false));
    }
  }, []);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("settingsConfig"))) {
      localStorage.setItem(
        "settingsConfig",
        JSON.stringify({
          fadeAway: {
            todoList: true,
            calendar: true,
          },
          hideInterface: true,
        })
      );
    }
  }, []);

  function getCurrentScene() {
    return scenes[currentSceneIndex];
  }

  return (
    <AppContext.Provider
      value={{
        musicVolume,
        setMusicVolume,
        currentSongInfo,
        setCurrentSongInfo,
        currentSceneIndex,
        setCurrentSceneIndex,
        getCurrentScene,
        showSceneModal,
        setShowSceneModal,
        showMixerModal,
        setShowMixerModal,
        showToolsMenu,
        setShowToolsMenu,
        showToDoList,
        setShowToDoList,
        allStickyNotes,
        setAllStickyNotes,
        showMenu,
        setShowMenu,
        showSettings,
        setShowSettings,
        setSettingsConfig,
        settingsConfig,
        setShowAboutMelofi,
        showAboutMelofi,
        setShowCalendar,
        showCalendar,
        setShowTimer,
        showTimer,
        setUsingSpotify,
        usingSpotify,
      }}
    >
      {loading ? <></> : <>{props.children}</>}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => useContext(AppContext);

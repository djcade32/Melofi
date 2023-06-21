import { createContext, useState, useContext, useEffect } from "react";
import { scenes } from "../data/scenes";

const AppContext = createContext({});

const AppContextProvider = (props) => {
  const [musicVolume, setMusicVolume] = useState(35);
  const [currentSongInfo, setCurrentSongInfo] = useState(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [showSceneModal, setShowSceneModal] = useState(false);
  const [showMixerModal, setShowMixerModal] = useState(false);
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const [showToDoList, setShowToDoList] = useState(false);
  const [allStickyNotes, setAllStickyNotes] = useState([]);

  useEffect(() => {
    setAllStickyNotes(JSON.parse(localStorage.getItem("stickyNoteList")) || []);
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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => useContext(AppContext);

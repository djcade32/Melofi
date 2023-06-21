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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setCurrentSceneIndex(JSON.parse(localStorage.getItem("currentSceneIndex")) || 0);
      setAllStickyNotes(JSON.parse(localStorage.getItem("stickyNoteList")) || []);
      setLoading(false);
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
      }}
    >
      {loading ? (
        <div
          style={{
            backgroundColor: DEFAULT,
            width: "100%",
            height: "100vh",
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                textAlign: "center",
                color: "white",
                fontFamily: "var(--font-poppins)",
                fontSize: 21,
                letterSpacing: 5,
              }}
            >
              LOADING
            </p>
            <img
              src={logo}
              alt="melofi logo"
              style={{
                width: 200,
                height: 200,
                animation: "logo-spin 5s linear infinite",
              }}
            />
          </div>
        </div>
      ) : (
        <>{props.children}</>
      )}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => useContext(AppContext);

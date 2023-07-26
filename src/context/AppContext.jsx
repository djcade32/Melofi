import { createContext, useState, useContext, useEffect } from "react";
import { scenes } from "../data/scenes";
import { items as songs } from "../data/songs";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { areTimestampsInSameDay, isDayBeforeCurrentDate } from "../helpers/dateUtils";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_GOOGLE_API,
  authDomain: "melofi-389415.firebaseapp.com",
  projectId: "melofi-389415",
  storageBucket: "melofi-389415.appspot.com",
  messagingSenderId: "404248652005",
  appId: "1:404248652005:web:926c9820ee3780aa7d4c0c",
  measurementId: "G-79SS2N9YZQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore();

const AppContext = createContext({});

const AppContextProvider = (props) => {
  const [authUser, setAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  const [musicVolume, setMusicVolume] = useState(35);
  const [currentSongInfo, setCurrentSongInfo] = useState(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(null);
  const [showSceneModal, setShowSceneModal] = useState(false);
  const [showMixerModal, setShowMixerModal] = useState(false);
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const [showToDoList, setShowToDoList] = useState(false);
  const [allStickyNotes, setAllStickyNotes] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
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
  const [shuffledSongList, setShuffledSongList] = useState(null);

  const [loading, setLoading] = useState(true);
  const [newAchievements, setNewAchievements] = useState([]);

  useEffect(() => {
    setAuthUser(auth);
    onAuthStateChanged(auth, (userObj) => {
      if (userObj) {
        setUser(userObj);
      }
    });
    if (auth.currentUser) {
      setUser(auth.currentUser);
    }
    if (user) {
      incrementConsecutiveDays();
    }
  }, [auth, user]);

  useEffect(() => {
    setCurrentSceneIndex(JSON.parse(localStorage.getItem("currentSceneIndex")) || 0);
    setAllStickyNotes(JSON.parse(localStorage.getItem("stickyNoteList")) || []);
    shuffleSongs();
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

  useEffect(() => {
    if (newAchievements.length > 0 && user) {
      console.log("New Achievement gained");
    }
  }, [newAchievements]);

  function getCurrentScene() {
    return scenes[currentSceneIndex];
  }

  const shuffleSongs = () => {
    let shuffled = songs
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    setShuffledSongList(shuffled);
    return shuffled;
  };

  const incrementConsecutiveDays = async () => {
    const docRef = doc(db, `users/${auth.currentUser.uid}`);
    const userSnapshot = await getDoc(docRef);
    if (userSnapshot.exists()) {
      let userData = {};
      if (isDayBeforeCurrentDate(parseInt(userSnapshot.data().lastLoginAt))) {
        if (isDayBeforeCurrentDate(parseInt(userSnapshot.data().lastVisitedAt))) {
          userData = {
            consecutiveDays: userSnapshot.data().consecutiveDays + 1,
            lastVisitedAt: Date.now(),
          };
        }
      } else {
        if (!areTimestampsInSameDay(parseInt(userSnapshot.data().lastLoginAt), new Date())) {
          userData = { consecutiveDays: 1, lastVisitedAt: Date.now() };
        }
      }
      userData.lastVisitedAt = Date.now();
      try {
        await updateDoc(docRef, userData);
      } catch (error) {
        console.log("Error updating consecutive days: ", error);
      }
    }
  };

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
        shuffledSongList,
        setShuffledSongList,
        showAuthModal,
        setShowAuthModal,
        authUser,
        user,
        setUser,
        setShowAccount,
        showAccount,
        db,
        newAchievements,
        setNewAchievements,
      }}
    >
      {loading ? <></> : <>{props.children}</>}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => useContext(AppContext);

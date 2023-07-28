import { createContext, useState, useContext, useEffect } from "react";
import { scenes } from "../data/scenes";
import { items as songs } from "../data/songs";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { areTimestampsInSameDay, isDayBeforeCurrentDate } from "../helpers/dateUtils";
import { getTimerWorkerUrl } from "../widgets/timerWidget/worker-script";

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

const worker = new Worker(getTimerWorkerUrl());

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
  const [showToaster, setShowToaster] = useState(false);
  const [webWorkerTime, setWebWorkerTime] = useState(7200);

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
      checkFocusedWorkaholicAchievement();
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
    console.log("notifications: ", newAchievements);
    if (newAchievements.length > 0 && user) {
      setShowToaster(true);
      setTimeout(() => {
        setShowToaster(false);
        setTimeout(() => {
          setNewAchievements(newAchievements.slice(1));
        }, 1000);
      }, 3000);
    }
  }, [newAchievements, user]);

  function getCurrentScene() {
    return scenes[currentSceneIndex];
  }

  useEffect(() => {
    if (webWorkerTime <= 0 && user) {
      worker.postMessage({ turn: "off", timeInput: 0 });
      addFocusedWorkaholicAchievement();
    }
  }, [webWorkerTime]);

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
          const numOfDays = userSnapshot.data().consecutiveDays + 1;
          userData = {
            consecutiveDays: numOfDays,
            lastVisitedAt: Date.now(),
          };
          if (
            numOfDays >= 30 &&
            !userSnapshot.data().achievements.includes("consistencyChampion")
          ) {
            setNewAchievements((prev) => [...prev, "consistencyChampion"]);
            userData.achievements = [...userSnapshot.data().achievements, "consistencyChampion"];
          }
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

  const checkFocusedWorkaholicAchievement = async () => {
    const docRef = doc(db, `users/${auth.currentUser.uid}`);
    const userSnapshot = await getDoc(docRef);
    if (userSnapshot.exists()) {
      if (!userSnapshot.data().achievements.includes("focusedWorkaholic")) {
        worker.onmessage = ({ data: { time } }) => {
          setWebWorkerTime(time);
        };
        worker.postMessage({ turn: "on", timeInput: webWorkerTime });
      }
    }
  };

  const addFocusedWorkaholicAchievement = async () => {
    const docRef = doc(db, `users/${auth.currentUser.uid}`);
    const userSnapshot = await getDoc(docRef);
    if (userSnapshot.exists()) {
      let userData = {
        achievements: [...userSnapshot.data().achievements, "focusedWorkaholic"],
      };
      setNewAchievements((prev) => [...prev, "focusedWorkaholic"]);
      try {
        await updateDoc(docRef, userData);
      } catch (error) {
        console.log("Error updating achievements with focusedWorkaholic achievement: ", error);
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
        showToaster,
        setShowToaster,
      }}
    >
      {loading ? <></> : <>{props.children}</>}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => useContext(AppContext);

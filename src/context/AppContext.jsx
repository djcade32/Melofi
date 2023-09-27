import { createContext, useState, useContext, useEffect } from "react";
import { scenes } from "../data/scenes";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { areTimestampsInSameDay, isDayBeforeCurrentDate } from "../helpers/dateUtils";
import { getTimerWorkerUrl } from "../scripts/worker-script";
import { useAuthContext } from "./AuthContext";
import playlist from "../data/playlist";
import usePremiumStatus from "../../stripe/usePremiumStatus";

const AppContext = createContext({});

const worker = new Worker(getTimerWorkerUrl());

const AppContextProvider = (props) => {
  const { user, db } = useAuthContext();

  const userIsPremium = usePremiumStatus(user);

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

  const [newAchievements, setNewAchievements] = useState([]);
  const [showToaster, setShowToaster] = useState(false);
  const [webWorkerTime, setWebWorkerTime] = useState(7200);
  const [newScenes, setNewScenes] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(playlist[0]);
  const [showTemplateWidget, setShowTemplateWidget] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedPomodoroTask, setSelectedPomodoroTask] = useState(null);
  const [openWidgets, setOpenWidgets] = useState([]);
  const [showModalOverlay, setShowModalOverlay] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  useEffect(() => {
    if (user) {
      incrementConsecutiveDays();
      checkFocusedWorkaholicAchievement();
    }
    getSettingsConfig();
    checkForNewScenes();
    setCurrentSceneIndex(JSON.parse(localStorage.getItem("currentSceneIndex")) || 0);
    setAllStickyNotes(JSON.parse(localStorage.getItem("stickyNoteList")) || []);
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
  }, [newAchievements]);

  useEffect(() => {
    if (webWorkerTime <= 0 && user) {
      worker.postMessage({ turn: "off", timeInput: 0 });
      addFocusedWorkaholicAchievement();
    }
  }, [webWorkerTime]);

  useEffect(() => {
    if (!openWidgets.includes("AuthModal") && showAuthModal) {
      setOpenWidgets((prev) => [...prev, "AuthModal"]);
    } else if (openWidgets.includes("AuthModal") && !showAuthModal) {
      setOpenWidgets((prev) => prev.filter((widget) => widget !== "AuthModal"));
    }

    if (!openWidgets.includes("AboutMelofi") && showAboutMelofi) {
      setOpenWidgets((prev) => [...prev, "AboutMelofi"]);
    } else if (openWidgets.includes("AboutMelofi") && !showAboutMelofi) {
      setOpenWidgets((prev) => prev.filter((widget) => widget !== "AboutMelofi"));
    }

    if (!openWidgets.includes("CalendarWidget") && showCalendar) {
      setOpenWidgets((prev) => [...prev, "CalendarWidget"]);
    } else if (openWidgets.includes("CalendarWidget") && !showCalendar) {
      setOpenWidgets((prev) => prev.filter((widget) => widget !== "CalendarWidget"));
    }

    if (!openWidgets.includes("MixerModal") && showMixerModal) {
      setOpenWidgets((prev) => [...prev, "MixerModal"]);
    } else if (openWidgets.includes("MixerModal") && !showMixerModal) {
      setOpenWidgets((prev) => prev.filter((widget) => widget !== "MixerModal"));
    }

    if (!openWidgets.includes("TemplateWidget") && showTemplateWidget) {
      setOpenWidgets((prev) => [...prev, "TemplateWidget"]);
    } else if (openWidgets.includes("TemplateWidget") && !showTemplateWidget) {
      setOpenWidgets((prev) => prev.filter((widget) => widget !== "TemplateWidget"));
    }

    if (!openWidgets.includes("SettingsModal") && showSettings) {
      setOpenWidgets((prev) => [...prev, "SettingsModal"]);
    } else if (openWidgets.includes("SettingsModal") && !showSettings) {
      setOpenWidgets((prev) => prev.filter((widget) => widget !== "SettingsModal"));
    }

    if (!openWidgets.includes("TimerWidget") && showTimer) {
      setOpenWidgets((prev) => [...prev, "TimerWidget"]);
    } else if (openWidgets.includes("TimerWidget") && !showTimer) {
      setOpenWidgets((prev) => prev.filter((widget) => widget !== "TimerWidget"));
    }

    if (!openWidgets.includes("ToDoListWidget") && showToDoList) {
      setOpenWidgets((prev) => [...prev, "ToDoListWidget"]);
    } else if (openWidgets.includes("ToDoListWidget") && !showToDoList) {
      setOpenWidgets((prev) => prev.filter((widget) => widget !== "ToDoListWidget"));
    }

    if (!openWidgets.includes("AccountModal") && showAccount) {
      setOpenWidgets((prev) => [...prev, "AccountModal"]);
    } else if (openWidgets.includes("AccountModal") && !showAccount) {
      setOpenWidgets((prev) => prev.filter((widget) => widget !== "AccountModal"));
    }

    if (!openWidgets.includes("AnnouncementModal") && showAnnouncementModal) {
      setOpenWidgets((prev) => [...prev, "AnnouncementModal"]);
    } else if (openWidgets.includes("AnnouncementModal") && !showAnnouncementModal) {
      setOpenWidgets((prev) => prev.filter((widget) => widget !== "AnnouncementModal"));
    }

    if (!openWidgets.includes("PremiumModal") && showPremiumModal) {
      setOpenWidgets((prev) => [...prev, "PremiumModal"]);
    } else if (openWidgets.includes("PremiumModal") && !showPremiumModal) {
      setOpenWidgets((prev) => prev.filter((widget) => widget !== "PremiumModal"));
    }
  }, [
    showAuthModal,
    showAboutMelofi,
    showCalendar,
    showMixerModal,
    showTemplateWidget,
    showSettings,
    showTimer,
    showToDoList,
    showAccount,
    showAnnouncementModal,
    showPremiumModal,
  ]);

  useEffect(() => {
    if (
      showAboutMelofi ||
      showAccount ||
      showAuthModal ||
      showAnnouncementModal ||
      showPremiumModal
    ) {
      setShowModalOverlay(true);
    } else {
      setShowModalOverlay(false);
    }
  }, [showAboutMelofi, showAccount, showAuthModal, showAnnouncementModal, showPremiumModal]);

  const getSettingsConfig = () => {
    if (!JSON.parse(localStorage.getItem("settingsConfig"))) {
      localStorage.setItem(
        "settingsConfig",
        JSON.stringify({
          fadeAway: {
            todoList: true,
            calendar: true,
          },
          hideInterface: true,
          playTimerSound: true,
        })
      );
      return;
    }
    // This is to update all the current Melofi user settingsConfig with playTimerSound setting
    if (JSON.parse(localStorage.getItem("settingsConfig")).playTimerSound === undefined) {
      const updatedSettingsConfig = {
        ...JSON.parse(localStorage.getItem("settingsConfig")),
        playTimerSound: true,
      };
      localStorage.setItem("settingsConfig", JSON.stringify(updatedSettingsConfig));
    }
  };

  function getCurrentScene() {
    if (scenes[currentSceneIndex].premium && !userIsPremium) {
      return scenes[0];
    }
    return scenes[currentSceneIndex];
  }

  const checkForNewScenes = () => {
    if (!newScenes) {
      const scenesConfig = JSON.parse(localStorage.getItem("scenes"));
      // Check to see if user has the sceneConfig
      if (!scenesConfig) {
        const list = [];
        scenes.map((scene) => {
          list.push(scene.name);
        });
        localStorage.setItem("scenes", JSON.stringify(list));
        setNewScenes([]);
        return;
      }

      // A new scene was added
      if (scenesConfig && scenesConfig.length < scenes.length) {
        const newSceneList = [];
        scenes.map((scene) => {
          if (!scenesConfig.includes(scene.name)) {
            newSceneList.push(scene.name);
            setNewScenes(newSceneList);
          }
        });
      } else {
        setNewScenes([]);
      }
    }
  };

  const incrementConsecutiveDays = async () => {
    const docRef = doc(db, `users/${user.uid}`);
    const userSnapshot = await getDoc(docRef);
    if (userSnapshot.exists()) {
      let userData = {};
      if (isDayBeforeCurrentDate(parseInt(userSnapshot.data().lastVisitedAt))) {
        const numOfDays = userSnapshot.data().consecutiveDays + 1;
        userData = {
          consecutiveDays: numOfDays,
          lastVisitedAt: Date.now(),
        };
        if (numOfDays >= 30 && !userSnapshot.data().achievements.includes("consistencyChampion")) {
          setNewAchievements((prev) => {
            return [...prev, "consistencyChampion"];
          });
          userData.achievements = [...userSnapshot.data().achievements, "consistencyChampion"];
        }
      } else if (areTimestampsInSameDay(parseInt(userSnapshot.data().lastVisitedAt), Date.now())) {
        userData = {
          consecutiveDays: userSnapshot.data().consecutiveDays,
          lastVisitedAt: Date.now(),
        };
      } else {
        userData = { consecutiveDays: 1, lastVisitedAt: Date.now() };
      }
      try {
        await updateDoc(docRef, userData);
      } catch (error) {
        console.log("Error updating consecutive days: ", error);
      }
    }
  };

  const checkFocusedWorkaholicAchievement = async () => {
    const docRef = doc(db, `users/${user.uid}`);
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
    const docRef = doc(db, `users/${user.uid}`);
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

  const updateZenMasterAchievement = async () => {
    const docRef = doc(db, `users/${user.uid}`);
    const userSnapshot = await getDoc(docRef);
    if (userSnapshot.exists()) {
      const newData = userSnapshot.data().achievementsProgress.zenMaster + 1;
      let userData = {
        achievementsProgress: {
          ...userSnapshot.data().achievementsProgress,
          zenMaster: newData,
        },
      };
      if (!userSnapshot.data().achievements.includes("zenMaster") && newData >= 50) {
        userData.achievements = [...userSnapshot.data().achievements, "zenMaster"];
        setNewAchievements((prev) => [...prev, "zenMaster"]);
      }
      try {
        await updateDoc(docRef, userData);
      } catch (error) {
        console.log("Error updating user lastLoginAt: ", error);
      }
    }
  };

  const updateUserLastLoginAt = async (user) => {
    const docRef = doc(db, `users/${user.uid}`);
    const userSnapshot = await getDoc(docRef);
    if (userSnapshot.exists()) {
      let userData = {
        lastLoginAt: user.metadata.lastLoginAt,
        lastVisitedAt: user.metadata.lastLoginAt,
      };
      if (!userSnapshot.data().achievements.includes("newbie")) {
        userData.achievements = [...userSnapshot.data().achievements, "newbie"];
        setNewAchievements((prev) => [...prev, "newbie"]);
      }
      try {
        await updateDoc(docRef, userData);
      } catch (error) {
        console.log("Error updating user lastLoginAt: ", error);
      }
    }
  };

  const incrementFocusedTime = async (incrementTime) => {
    const dayInSeconds = 86400;

    const docRef = doc(db, `users/${user.uid}`);
    const userSnapshot = await getDoc(docRef);
    if (userSnapshot.exists()) {
      try {
        const newFocusedTime = userSnapshot.data().focusedTime + incrementTime;
        let userData = { focusedTime: newFocusedTime };
        if (
          !userSnapshot.data().achievements.includes("timeKeeper") &&
          newFocusedTime / 100 >= dayInSeconds &&
          !newAchievements.includes("timeKeeper")
        ) {
          setNewAchievements((prev) => [...prev, "timeKeeper"]);
          userData.achievements = [...userSnapshot.data().achievements, "timeKeeper"];
          console.log("time keepre achieved");
        }
        await updateDoc(docRef, userData);
      } catch (error) {
        console.log("Error incrementing focused time: ", error);
      }
    }
  };

  const updateTaskNinjaAchievement = async () => {
    const docRef = doc(db, `users/${user.uid}`);
    const userSnapshot = await getDoc(docRef);
    if (userSnapshot.exists()) {
      const newData = userSnapshot.data().achievementsProgress.taskNinja + 1;
      let userData = {
        achievementsProgress: {
          ...userSnapshot.data().achievementsProgress,
          taskNinja: newData,
        },
      };
      if (!userSnapshot.data().achievements.includes("taskNinja") && newData >= 25) {
        console.log("achieved task ninjas");
        userData.achievements = [...userSnapshot.data().achievements, "taskNinja"];
        setNewAchievements((prev) => [...prev, "taskNinja"]);
      }
      try {
        await updateDoc(docRef, userData);
      } catch (error) {
        console.log("Error updating user lastLoginAt: ", error);
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
        showAuthModal,
        setShowAuthModal,
        setShowAccount,
        showAccount,
        newAchievements,
        setNewAchievements,
        showToaster,
        setShowToaster,
        updateZenMasterAchievement,
        updateUserLastLoginAt,
        incrementFocusedTime,
        updateTaskNinjaAchievement,
        newScenes,
        setNewScenes,
        selectedPlaylist,
        setSelectedPlaylist,
        showTemplateWidget,
        setShowTemplateWidget,
        selectedTemplate,
        setSelectedTemplate,
        selectedPomodoroTask,
        setSelectedPomodoroTask,
        openWidgets,
        showModalOverlay,
        showAnnouncementModal,
        setShowAnnouncementModal,
        showPremiumModal,
        setShowPremiumModal,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => useContext(AppContext);

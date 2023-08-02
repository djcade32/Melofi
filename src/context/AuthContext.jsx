import { createContext, useState, useContext, useEffect } from "react";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { timeStampToDateString } from "../helpers/dateUtils";
import { durationInDHMS } from "../helpers/strings";
import LoadingPage from "../pages/LoadingPage";

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

const AuthContext = createContext({});

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (auth.currentUser) {
        setUser(auth.currentUser);
        onSnapshot(doc(db, `users/${auth.currentUser.uid}`), (doc) => {
          const { lastLoginAt, focusedTime, numOfStickyNotes, consecutiveDays, achievements } =
            doc.data();

          setUserData({
            lastLoginAt: timeStampToDateString(lastLoginAt),
            focusedTime: durationInDHMS(focusedTime),
            numOfStickyNotes: numOfStickyNotes,
            consecutiveDays: consecutiveDays,
            achievements: achievements,
          });
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  // useEffect(() => {
  //   console.log("fired 2nd");

  //   if (user) {
  //     onSnapshot(doc(db, `users/${user.uid}`), (doc) => {
  //       const { lastLoginAt, focusedTime, numOfStickyNotes, consecutiveDays, achievements } =
  //         doc.data();

  //       setUserData({
  //         lastLoginAt: timeStampToDateString(lastLoginAt),
  //         focusedTime: durationInDHMS(focusedTime),
  //         numOfStickyNotes: numOfStickyNotes,
  //         consecutiveDays: consecutiveDays,
  //         achievements: achievements,
  //       });
  //     });
  //     setLoading(false);
  //   }
  // }, [user]);

  // useEffect(() => {
  //   // // Check if the page has already loaded
  //   // if (document.readyState === "complete") {
  //   //   setLoading(false);
  //   // } else {
  //   //   window.addEventListener("load", setLoading(false));
  //   //   // Remove the event listener when component unmounts
  //   //   return () => window.removeEventListener("load", setLoading(false));
  //   // }
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        db,
        auth,
        userData,
      }}
    >
      {loading ? <LoadingPage /> : <>{props.children}</>}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);

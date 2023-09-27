import { createContext, useState, useContext, useEffect } from "react";

// import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { timeStampToDateString } from "../helpers/dateUtils";
import { durationInDHMS } from "../helpers/strings";
import LoadingPage from "../pages/LoadingPage";
import firebaseApp from "../../firebase/firebaseClient";

const auth = getAuth(firebaseApp);
const db = getFirestore();

const AuthContext = createContext({});

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (auth.currentUser) {
        console.log("user: ", auth.currentUser);
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

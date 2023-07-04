import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppContextProvider from "./context/AppContext";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="404248652005-nff5p1j0scvmp8p7q028l91f4m3gkjtv.apps.googleusercontent.com">
    <React.StrictMode>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

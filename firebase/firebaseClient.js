import { initializeApp } from "firebase/app";

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
let app = null;
export default app = initializeApp(firebaseConfig);

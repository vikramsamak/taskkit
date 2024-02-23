import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAet1wA9T6llepCX3ZW5UvFDB2j-IueJvw",
  authDomain: "taskkit-1cc5e.firebaseapp.com",
  projectId: "taskkit-1cc5e",
  storageBucket: "taskkit-1cc5e.appspot.com",
  messagingSenderId: "93295130410",
  appId: "1:93295130410:web:a1ef7ce32333c123f11053",
  measurementId: "G-GQ7DH7T6QJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

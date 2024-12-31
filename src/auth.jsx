import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "myfirstproject-c21c6.firebaseapp.com",
    projectId: "myfirstproject-c21c6",
    storageBucket: "myfirstproject-c21c6.firebasestorage.app",
    messagingSenderId: "796875155093",
    appId: "1:796875155093:web:37f2ef25ffc3daef09dd9c",
    measurementId: "G-9P0PCWEYHF"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
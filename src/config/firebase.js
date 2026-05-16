// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2QpwzQc8NAsSD5JJmVGgRhMWNsYmv5ng",
  authDomain: "pamindudev.firebaseapp.com",
  projectId: "pamindudev",
  storageBucket: "pamindudev.appspot.com",
  messagingSenderId: "506911946700",
  appId: "1:506911946700:web:cafc6e269ce6d04c600f69"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Set persistence once
setPersistence(auth, browserSessionPersistence).catch(console.error);
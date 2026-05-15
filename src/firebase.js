// Firebase core
import { initializeApp } from "firebase/app";

// Firebase services
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA2QpwzQc8NAsSD5JJmVGgRhMWNsYmv5ng",
  authDomain: "pamindudev.firebaseapp.com",
  projectId: "pamindudev",
  storageBucket: "pamindudev.appspot.com",
  messagingSenderId: "506911946700",
  appId: "1:506911946700:web:cafc6e269ce6d04c600f69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// 🔥 Firebase Services
export const db = getFirestore(app);

export const auth = getAuth(app);

setPersistence(
  auth,
  browserSessionPersistence
).catch((error) => {
  console.error(error);
});

export const storage = getStorage(app);


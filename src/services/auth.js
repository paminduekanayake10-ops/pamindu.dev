import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

// Google Login
const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  } catch (error) {
    console.log(error);
  }
};

// Logout
export const logoutUser = async () => {
  await signOut(auth);
};

// Email Signup
export const signupUser = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Email Login
export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};
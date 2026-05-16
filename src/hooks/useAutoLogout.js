import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const TIMEOUT = 15 * 60 * 1000; // 15 mins

function useAutoLogout() {
  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);

      timer = setTimeout(async () => {
        try {
          await signOut(auth);

          alert(
            "Session expired due to inactivity."
          );

          window.location.href =
            "/admin-login";

        } catch (err) {
          console.error(err);
        }
      }, TIMEOUT);
    };

    // activity listeners
    window.addEventListener(
      "mousemove",
      resetTimer
    );

    window.addEventListener(
      "keydown",
      resetTimer
    );

    window.addEventListener(
      "click",
      resetTimer
    );

    window.addEventListener(
      "scroll",
      resetTimer
    );

    resetTimer();

    return () => {
      clearTimeout(timer);

      window.removeEventListener(
        "mousemove",
        resetTimer
      );

      window.removeEventListener(
        "keydown",
        resetTimer
      );

      window.removeEventListener(
        "click",
        resetTimer
      );

      window.removeEventListener(
        "scroll",
        resetTimer
      );
    };
  }, []);
}

export default useAutoLogout;
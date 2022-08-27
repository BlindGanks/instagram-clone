import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth, googleAuthProvider } from "./firebase";

const isOnMobile = () => {
  const ua = navigator.userAgent;
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  )
    return true;
  return false;
};
const signInWithGoogle = () => {
  if (isOnMobile) {
    signInWithRedirect(auth, googleAuthProvider).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert("Failed to sign in");
      console.log(error);
    });
    return;
  }

  signInWithPopup(auth, googleAuthProvider).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert("Failed to sign in");
    console.log(error);
  });
};

export { signInWithGoogle };

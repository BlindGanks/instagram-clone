import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "./firebase";

const signInWithGoogle = () => {
  signInWithPopup(auth, googleAuthProvider).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;

    alert("Failed to sign in");
    console.log(error);
  });
};

export { signInWithGoogle };

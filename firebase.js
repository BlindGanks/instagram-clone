import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};
/*const firebaseConfig = {
  apiKey: "AIzaSyDlC4MOJhZAjveQ6avZXGV-f-XO5WoZN9I",
  authDomain: "insta-clone-3fbd9.firebaseapp.com",
  projectId: "insta-clone-3fbd9",
  storageBucket: "insta-clone-3fbd9.appspot.com",
  messagingSenderId: "472780886128",
  appId: "1:472780886128:web:5d0a5244d282cedea764b5",
};*/

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const googleAuthProvider = new GoogleAuthProvider();
const auth = getAuth();

export { app, db, storage, auth, googleAuthProvider };

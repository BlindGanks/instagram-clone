import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "insta-clone-3fbd9.firebaseapp.com",
  projectId: "insta-clone-3fbd9",
  storageBucket: "insta-clone-3fbd9.appspot.com",
  messagingSenderId: "472780886128",
  appId: "1:472780886128:web:5d0a5244d282cedea764b5",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };

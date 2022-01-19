// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlC4MOJhZAjveQ6avZXGV-f-XO5WoZN9I",
  authDomain: "insta-clone-3fbd9.firebaseapp.com",
  projectId: "insta-clone-3fbd9",
  storageBucket: "insta-clone-3fbd9.appspot.com",
  messagingSenderId: "472780886128",
  appId: "1:472780886128:web:5d0a5244d282cedea764b5",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };

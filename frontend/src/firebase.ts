import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtRp0YKVeoxktmsZYX01F9OIuxm00F1zM",
  authDomain: "lifevault-a87b8.firebaseapp.com",
  projectId: "lifevault-a87b8",
  storageBucket: "lifevault-a87b8.appspot.com", 
  messagingSenderId: "363380650200",
  appId: "1:363380650200:web:5e96fdaa77535e1856e7ad",
  measurementId: "G-N2P8R1PXJS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
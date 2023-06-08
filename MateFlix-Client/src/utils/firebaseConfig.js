import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBSTOAwzvWp1dU7L1Ie074paCSuN_ioxCY",
  authDomain: "myflix-2904f.firebaseapp.com",
  projectId: "myflix-2904f",
  storageBucket: "myflix-2904f.appspot.com",
  messagingSenderId: "516385979662",
  appId: "1:516385979662:web:8d72dd4a971427d5136b5f",
  measurementId: "G-MHZM76QQX6"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
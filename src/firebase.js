// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHe2HcoYoH3tEFOxDd7j94gedWDSkPqas",
  authDomain: "clone-c5db7.firebaseapp.com",
  projectId: "clone-c5db7",
  storageBucket: "clone-c5db7.appspot.com",
  messagingSenderId: "787655773157",
  appId: "1:787655773157:web:8fa6653057b3bf8564bd0c",
  measurementId: "G-CPHCQY793K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

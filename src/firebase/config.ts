import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "finance-tracker-d0302.firebaseapp.com",
  projectId: "finance-tracker-d0302",
  storageBucket: "finance-tracker-d0302.appspot.com",
  messagingSenderId: "1060681917409",
  appId: "1:1060681917409:web:51dda1b67d54a2464368a0",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export {auth, db};

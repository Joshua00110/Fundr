import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Add this

// Replace these with your actual keys from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDNvLQ7lMOp1wCoEWs_P3PJsRYwCaOThpM",
  authDomain: "fundr-410a6.firebaseapp.com",
  projectId: "fundr-410a6",
  storageBucket: "fundr-410a6.firebasestorage.app",
  messagingSenderId: "753457099420",
  appId: "1:753457099420:web:bb602eaf5241bff21eb359",
  measurementId: "G-VSKQBR8KF5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Add this

export { auth, db }; // Export both
import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArkNxkPO07dXCe5yqpYpapF0Y6BdHgSwU",
  authDomain: "student-management-cb2d6.firebaseapp.com",
  projectId: "student-management-cb2d6",
  storageBucket: "student-management-cb2d6.firebasestorage.app",
  messagingSenderId: "261566028579",
  appId: "1:261566028579:web:90284a781af24098864a96",
  measurementId: "G-JC9SQC8X3W"
};

const app = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

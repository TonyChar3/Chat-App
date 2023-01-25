// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcRm5j66CE2BAEfVecy8VxVGvzNiDQ204",
  authDomain: "chatting-app-b7b11.firebaseapp.com",
  projectId: "chatting-app-b7b11",
  storageBucket: "chatting-app-b7b11.appspot.com",
  messagingSenderId: "87226145833",
  appId: "1:87226145833:web:af4a21d23e3d4a5fbed038",
  measurementId: "G-M9MWPEE4JZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

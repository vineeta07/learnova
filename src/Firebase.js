
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBZJNaq6ikUPLmBv7zOYjge-RjEaiFgHkY",
  authDomain: "devproject-frontend.firebaseapp.com",
  projectId: "devproject-frontend",
  storageBucket: "devproject-frontend.firebasestorage.app",
  messagingSenderId: "739332197837",
  appId: "1:739332197837:web:de739a02ba63c1a3e78884",
  measurementId: "G-P8GF11QKFQ",
  databaseURL : "https://devproject-frontend-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig);

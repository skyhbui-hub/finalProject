// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt1UzIH_6NGaP5uxi9s8veK26tEJ_6_BY",
  authDomain: "fullstack-finalproject-e7684.firebaseapp.com",
  projectId: "fullstack-finalproject-e7684",
  storageBucket: "fullstack-finalproject-e7684.firebasestorage.app",
  messagingSenderId: "181902249058",
  appId: "1:181902249058:web:3717676976f7af4ad8953b",
  measurementId: "G-1MTN82LRF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
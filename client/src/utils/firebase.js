// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD77ou6dpe5faZY6qWflT1-AcoVVhNONM",
  authDomain: "flux-29359.firebaseapp.com",
  projectId: "flux-29359",
  storageBucket: "flux-29359.firebasestorage.app",
  messagingSenderId: "11466603510",
  appId: "1:11466603510:web:25301956c2c00f0a67e5d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
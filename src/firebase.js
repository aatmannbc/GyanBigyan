// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDSaytS6BBrIZQ6zb0P_ZzxMDJ4agSl3U",
  authDomain: "gyanbigyan-5faae.firebaseapp.com",
  projectId: "gyanbigyan-5faae",
  storageBucket: "gyanbigyan-5faae.firebasestorage.app",
  messagingSenderId: "553585539285",
  appId: "1:553585539285:web:977930f96c6f04dec88a5c",
  measurementId: "G-7CQFN8LBPC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
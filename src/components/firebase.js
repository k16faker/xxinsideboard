// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL-lkN4Q4XyCvAYsbvJ44gFiav3lOSgX0",
  authDomain: "inside-practice-7224c.firebaseapp.com",
  projectId: "inside-practice-7224c",
  storageBucket: "inside-practice-7224c.appspot.com",
  messagingSenderId: "68239043856",
  appId: "1:68239043856:web:677ba43bef3ecd109c8995",
  measurementId: "G-DB21W2RMT2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

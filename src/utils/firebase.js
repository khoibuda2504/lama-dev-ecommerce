// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blog-lama-dev-next.firebaseapp.com",
  projectId: "blog-lama-dev-next",
  storageBucket: "blog-lama-dev-next.appspot.com",
  messagingSenderId: "1068314009167",
  appId: "1:1068314009167:web:cc0870f30d0c4723ae143a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
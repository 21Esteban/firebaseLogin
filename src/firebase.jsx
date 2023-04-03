// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLl70H9TAdzrVKmT3u4RNnzTP-1BjzNEY",
  authDomain: "fir-login-8d93f.firebaseapp.com",
  projectId: "fir-login-8d93f",
  storageBucket: "fir-login-8d93f.appspot.com",
  messagingSenderId: "117971707768",
  appId: "1:117971707768:web:03e9da1be2146012a08a8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
export {app , auth}
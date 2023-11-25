// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";

import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDYQl38swiPPv8a3bYsVh2RD0ZreabQra0",

  authDomain: "kombet-floris.firebaseapp.com",

  projectId: "kombet-floris",

  storageBucket: "kombet-floris.appspot.com",

  messagingSenderId: "359545800642",

  appId: "1:359545800642:web:65ff061b9d140dda9c385b",

  measurementId: "G-133DDGM1HC"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const google_provider = new GoogleAuthProvider();
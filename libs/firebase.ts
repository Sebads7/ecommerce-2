// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDW1wdl9gYk4SlFx70ZMJCyEIxfKoKzmoA",
  authDomain: "e-commerce-next-2ae04.firebaseapp.com",
  projectId: "e-commerce-next-2ae04",
  storageBucket: "e-commerce-next-2ae04.appspot.com",
  messagingSenderId: "787810408311",
  appId: "1:787810408311:web:b7fd6b551e54cd8844b372",
  measurementId: "G-MYRCCJEWHP",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebaseApp;

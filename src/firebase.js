import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  //ktw-portfolio
  apiKey: "AIzaSyBFa8GlYk-t1Tv0__o3ivyoZ2XrGxiboPA",
  authDomain: "ktw-portfolio.firebaseapp.com",
  projectId: "ktw-portfolio",
  storageBucket: "ktw-portfolio.appspot.com",
  messagingSenderId: "622068104617",
  appId: "1:622068104617:web:dda143663c773c1eda58b8",
  measurementId: "G-W30BT4Z884",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };

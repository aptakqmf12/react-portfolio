import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  //배포용
  apiKey: "AIzaSyBFa8GlYk-t1Tv0__o3ivyoZ2XrGxiboPA",
  authDomain: "ktw-portfolio.firebaseapp.com",
  projectId: "ktw-portfolio",
  storageBucket: "ktw-portfolio.appspot.com",
  messagingSenderId: "622068104617",
  appId: "1:622068104617:web:dda143663c773c1eda58b8",
  measurementId: "G-W30BT4Z884",

  // 테스트용
  // apiKey: "AIzaSyDZ8Rz9L2dxyyCbbaX0ljeKqKf26vHF7JM",
  // authDomain: "ktw-react-portfolio.firebaseapp.com",
  // projectId: "ktw-react-portfolio",
  // storageBucket: "ktw-react-portfolio.appspot.com",
  // messagingSenderId: "813077569146",
  // appId: "1:813077569146:web:eb9311c0299e1ca3c125c3",
  // measurementId: "G-QSYGB2J7DM",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };

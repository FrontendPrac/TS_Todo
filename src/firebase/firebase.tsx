import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3lI52U435rGzI0LQQ8RcSziDW_9pV8pM",
  authDomain: "ts-todoself.firebaseapp.com",
  projectId: "ts-todoself",
  storageBucket: "ts-todoself.appspot.com",
  messagingSenderId: "772320960122",
  appId: "1:772320960122:web:9c0b5f6445d950151ba5c3",
};

export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);

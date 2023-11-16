import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCzYRr8BE1PH5WrjpjStxNqpzcgm5H1IZM",
  authDomain: "insta-clone-2989b.firebaseapp.com",
  projectId: "insta-clone-2989b",
  storageBucket: "insta-clone-2989b.appspot.com",
  messagingSenderId: "121906127042",
  appId: "1:121906127042:web:51bf8fd82c5e28659a9b5b",
  measurementId: "G-SV6YSBYXW9"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);


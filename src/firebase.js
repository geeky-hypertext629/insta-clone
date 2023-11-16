// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzYRr8BE1PH5WrjpjStxNqpzcgm5H1IZM",
  authDomain: "insta-clone-2989b.firebaseapp.com",
  projectId: "insta-clone-2989b",
  storageBucket: "insta-clone-2989b.appspot.com",
  messagingSenderId: "121906127042",
  appId: "1:121906127042:web:51bf8fd82c5e28659a9b5b",
  measurementId: "G-SV6YSBYXW9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);


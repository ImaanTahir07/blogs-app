import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAVBFROZjtpV4If7AHJ1VpQDA-MFWCteQI",
    authDomain: "blog-articles-aba95.firebaseapp.com",
    projectId: "blog-articles-aba95",
    storageBucket: "blog-articles-aba95.firebasestorage.app",
    messagingSenderId: "1017221145121",
    appId: "1:1017221145121:web:c191b8025259cc87d8b960",
    measurementId: "G-DYSWWDMYY5"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, signInWithPopup, signOut };
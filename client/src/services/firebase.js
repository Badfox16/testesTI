import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2en8Xpon2edUKISGWl-N1KBxi6zXXQDU",
  authDomain: "testes-ti.firebaseapp.com",
  projectId: "testes-ti",
  storageBucket: "testes-ti.appspot.com",
  messagingSenderId: "619391376644",
  appId: "1:619391376644:web:4de2fb517d0bcd9a88c451",
  measurementId: "G-0GB3PNWX6L"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };

import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsNvz3l5FK68U5dK8E0V7nIb2CdMcRBTM",
  authDomain: "clone-e2087.firebaseapp.com",
  projectId: "clone-e2087",
  storageBucket: "clone-e2087.appspot.com",
  messagingSenderId: "1020619379278",
  appId: "1:1020619379278:web:dc8e0eb2c9565a720f691f",
  measurementId: "G-K359FM5SB3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

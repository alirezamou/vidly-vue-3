import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7f8b34M_FkUY5yxoHTu3wQlDnV8OjpPs",
  authDomain: "vidly-e7702.firebaseapp.com",
  projectId: "vidly-e7702",
  storageBucket: "vidly-e7702.appspot.com",
  messagingSenderId: "421583740594",
  appId: "1:421583740594:web:21ef4210a191a099ce73ab",
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseStore = getFirestore(app);
export const FirebaseAuth = getAuth(FirebaseApp);

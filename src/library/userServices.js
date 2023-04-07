import { FirebaseStore } from "./firebase";

import { setDoc, doc } from "firebase/firestore/lite";

export async function addRegisteredUser(user) {
  const docRef = doc(FirebaseStore, "/users/" + user.uid);

  try {
    await setDoc(docRef, user);
  } catch (error) {
    throw error;
  }
}

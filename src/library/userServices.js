import { FirebaseStore } from "./firebase";

import { setDoc, doc, getDoc } from "firebase/firestore/lite";

export async function addRegisteredUser(user) {
  const docRef = doc(FirebaseStore, "/users/" + user.uid);

  try {
    await setDoc(docRef, user);
  } catch (error) {
    throw error;
  }
}

export async function getUser(userId) {
  const docRef = doc(FirebaseStore, "/users/" + userId);

  try {
    const userSnapshot = await getDoc(docRef);
    return userSnapshot.data();
  } catch (error) {
    throw error;
  }
}

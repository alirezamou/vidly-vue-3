import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FirebaseAuth } from "@/library/firebase";

export async function login(email, password) {
  if (email === "" || password === "") {
    throw new Error("Email or Password is empty");
  } else {
    try {
      const response = await signInWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
      const user = {
        uid: response.user.uid,
        email: response.user.email,
      };

      return user;
    } catch (error) {
      if (error.message === "Firebase: Error (auth/user-not-found).") {
        throw new Error("Email or Password is wrong");
      }
      throw error;
    }
  }
}

export async function register(email, password) {
  if (email === "" || password === "") {
    throw new Error("Email or Password is empty");
  } else {
    try {
      const response = await createUserWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
      const user = {
        uid: response.user.uid,
        email: response.user.email,
      };
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export async function signout() {
  try {
    await signOut(FirebaseAuth);
  } catch (error) {
    throw error;
  }
}

export function isAuthenticated() {
  if (FirebaseAuth.currentUser !== null) {
    return true;
  } else {
    return false;
  }
}

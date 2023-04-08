import { FirebaseStore } from "./firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
} from "firebase/firestore/lite";

export const moviesCollectionRef = collection(FirebaseStore, "movies");

export async function getMovies() {
  const moviesSnapshot = await getDocs(moviesCollectionRef);

  if (moviesSnapshot) {
    const moviesDocs = moviesSnapshot.docs;
    return moviesDocs.map((movieDoc) => movieDoc.data());
  } else throw new Error("Something wrong went with fetching the movies");
}

export async function getMovie(id) {
  if (!id) {
    throw new Error("ID of the movie is not provided");
  }

  const movieDocRef = doc(FirebaseStore, "/movies/" + id);
  const movieDoc = await getDoc(movieDocRef);
  if (movieDoc) {
    return movieDoc.data();
  } else {
    throw new Error(`Error occured with fetching the movie with id: ${id}`);
  }
}

export async function addMovie(movie) {
  const docRef = await addDoc(moviesCollectionRef, movie);
  if (!docRef) {
    throw new Error("Error occured while adding movie");
  }
}

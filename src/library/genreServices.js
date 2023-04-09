import { FirebaseStore } from "./firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore/lite";

export const genresCollection = collection(FirebaseStore, "genres");

export async function getGenres() {
  const genresSnapshot = await getDocs(genresCollection);

  if (genresSnapshot) {
    const genresDocs = genresSnapshot.docs;
    return genresDocs.map((genreDoc) => genreDoc.data());
  } else throw new Error("Something went wrong with fetching genres");
}

export async function addGenre(genreName) {
  const docRef = doc(genresCollection);

  const genre = {
    _id: docRef.id,
    name: genreName,
  };

  try {
    await setDoc(docRef, genre);
    return genre;
  } catch (error) {
    throw error;
  }
}

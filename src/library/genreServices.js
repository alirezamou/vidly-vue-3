import { FirebaseStore } from "./firebase";
import { collection, getDocs } from "firebase/firestore/lite";

export const genresCollection = collection(FirebaseStore, "genres");

export async function getGenres() {
  const genresSnapshot = await getDocs(genresCollection);

  if (genresSnapshot) {
    const genresDocs = genresSnapshot.docs;
    return genresDocs.map((genreDoc) => genreDoc.data());
  } else throw new Error("Something went wrong with fetching genres");
}

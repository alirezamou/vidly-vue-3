import { createStore } from "vuex";
import { getMovies } from "../library/moviesServices";
import { getGenres } from "../library/genreServices";

import { FirebaseAuth } from "../library/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const store = createStore({
  state: {
    movies: [],
    genres: [],
    user: {
      loggedIn: false,
      data: null,
    },
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    SET_GENRES(state, genres) {
      state.genres = genres;
    },
    SET_USER(state, user) {
      state.user.data = user;
      state.user.loggedIn = true;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      const response = await signInWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );

      if (response) {
        commit("SET_USER", response.user);
      } else {
        throw new Error("Unable to login");
      }
    },

    async register({ commit }, { username, email, password }) {
      const response = await createUserWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
      if (response) {
        const user = { username, ...response.user };
        commit("SET_USER", user);
      } else {
        throw new Error("Unable to register user");
      }
    },
  },
  plugins: [
    async (store) => {
      try {
        const movies = await getMovies();
        store.commit("SET_MOVIES", movies);
      } catch (error) {
        console.log(error.message);
      }

      try {
        const genres = await getGenres();
        store.commit("SET_GENRES", genres);
      } catch (error) {
        console.log(error.message);
      }
    },
  ],
});

export default store;

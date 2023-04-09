import { createStore } from "vuex";
import { getMovies, addMovie } from "../library/moviesServices";
import { getGenres, addGenre } from "../library/genreServices";
import { addRegisteredUser, getUser } from "../library/userServices";

import { FirebaseAuth } from "../library/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
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
  getters: {
    getMovie: (state) => (id) => {
      return state.movies.find((movie) => movie._id === id);
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
    SET_USERNAME(state, username) {
      state.user.data.username = username;
    },
    LOGOUT(state) {
      state.user.data = null;
      state.user.loggedIn = false;
    },
    ADD_MOVIE(state, movie) {
      state.movies.push(movie);
    },
    ADD_GENRE(state, newGenre) {
      state.genres.push(newGenre);
    },
  },
  actions: {
    async addGenre({ commit }, genreName) {
      try {
        const newGenre = await addGenre(genreName);
        commit("ADD_GENRE", newGenre);
      } catch (error) {
        throw error;
      }
    },
    async addMovie({ commit }, movie) {
      try {
        await addMovie(movie);
        commit("ADD_MOVIE", movie);
      } catch (error) {
        throw error;
      }
    },
    async getMovies({ commit }) {
      try {
        const movies = await getMovies();
        commit("SET_MOVIES", movies);
      } catch (error) {
        throw error;
      }
    },
    async getGenres({ commit }) {
      try {
        const genres = await getGenres();
        commit("SET_GENRES", genres);
      } catch (error) {
        throw error;
      }
    },
    async login({ commit }, { email, password }) {
      const response = await signInWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );

      if (response) {
        const user = {
          uid: response.user.uid,
          email: response.user.email,
          username: null,
        };

        commit("SET_USER", user);

        try {
          const { username } = await getUser(response.user.uid);
          commit("SET_USERNAME", username);
        } catch (error) {
          // TODO: implement a way to handle the username being null instead of console log the error
          console.log(error);
        }
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
        const user = {
          username,
          uid: response.user.uid,
          email: response.user.email,
        };

        commit("SET_USER", user);

        try {
          await addRegisteredUser(user);
        } catch (error) {
          // TODO: implement a way besides the console log the error.
          console.log(error.message);
        }
      } else {
        throw new Error("Unable to register user");
      }
    },

    async logout({ commit }) {
      try {
        await signOut(FirebaseAuth);

        commit("LOGOUT");
      } catch (error) {
        throw error;
      }
    },
  },
  plugins: [
    async (store) => {
      await store.dispatch("getMovies");

      await store.dispatch("getGenres");
    },
  ],
});

export default store;

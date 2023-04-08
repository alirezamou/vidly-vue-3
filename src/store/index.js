import { createStore } from "vuex";
import { getMovies } from "../library/moviesServices";
import { getGenres } from "../library/genreServices";
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
  },
  actions: {
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

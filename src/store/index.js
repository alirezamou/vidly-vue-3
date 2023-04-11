import { createStore } from "vuex";
import {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../library/moviesServices";
import { getGenres, addGenre } from "../library/genreServices";
import { addRegisteredUser, getUser } from "../library/userServices";
import { login, register, signout } from "@/library/authServices";

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
    UPDATE_MOVIE(state, movie) {
      const movieIndex = state.movies.findIndex((m) => m._id === movie._id);
      state.movies[movieIndex] = movie;
    },
    DELETE_MOVIE(state, movie) {
      const movieIndex = state.movies.findIndex((m) => m._id === movie._id);
      state.movies.splice(movieIndex, 1);
    },
  },
  actions: {
    async deleteMovie({ commit }, movie) {
      if (movie && movie._id) {
        try {
          await deleteMovie(movie);
          commit("DELETE_MOVIE", movie);
        } catch (error) {
          throw error;
        }
      } else {
        throw new Error("movie or _id is undefined");
      }
    },
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
    async updateMovie({ commit }, movie) {
      try {
        await updateMovie(movie);
        commit("UPDATE_MOVIE", movie);
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
      try {
        const user = await login(email, password);
        user.username = null;
        commit("SET_USER", user);

        const { username } = await getUser(user.uid);
        commit("SET_USERNAME", username);
      } catch (error) {
        // TODO: implement a way to handle the username being null instead of console log the error
        console.log(error);
      }
    },
    async register({ commit }, { username, email, password }) {
      try {
        const user = await register(email, password);
        user.username = username;
        commit("SET_USER", user);

        await addRegisteredUser(user);
      } catch (error) {
        // TODO: implement a way besides the console log the error.
        console.log(error);
      }
    },

    async logout({ commit }) {
      try {
        await signout();

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

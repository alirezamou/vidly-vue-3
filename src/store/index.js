import { createStore } from "vuex";
import { getMovies } from "../library/moviesServices";
import { getGenres } from "../library/genreServices";

const store = createStore({
  state: {
    movies: [],
    genres: [],
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    SET_GENRES(state, genres) {
      state.genres = genres;
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

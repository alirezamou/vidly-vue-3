import { createStore } from "vuex";
import { getMovies } from "../library/moviesServices";

const store = createStore({
  state: {
    movies: [],
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
  },
  plugins: [
    async (store) => {
      try {
        const movies = await getMovies();
        store.commit("SET_MOVIES", movies);
      } catch (error) {
        console.log(Error.message);
      }
    },
  ],
});

export default store;

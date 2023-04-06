<template>

    <search :movies="movies" @filteredMovies="filter_movies"/>

    <table v-if="movies.length" class="table">
        <sorted :movies="filteredMovies" @sortedMovies="sort_movies"/>

        <paginated :items="sortedMovies" :per_page="per_page" :current_page="current_page"/>
    </table>

    <ul class="pagination">
        <li v-for="i in totalPages" :key="i" class="page-item">
            <a
              @click="current_page = i"
              class="page-link"
              :class="{ active: current_page === i}"
              v-text="i + 1"
            ></a>
        </li>
    </ul>

    <p v-if="!movies.length">no movies to show</p>

</template>

<script>
import PaginatedTableBody from './PaginatedTableBody.vue';
import MoviesSort from "./MoviesSort.vue";
import MoviesSearch from './MoviesSearch.vue';

export default {
    name: "MoviesIndex",
    components: {
        "paginated": PaginatedTableBody,
        "sorted": MoviesSort,
        "search": MoviesSearch,
    },
    data() {
        return {
            movies: this.$store.state.movies,
            sortedMovies: this.$store.state.movies,
            filteredMovies: this.$store.state.movies,
            per_page: 5,
            current_page: 0,
        }
    },
    computed: {
        totalPages() {
            const total = Math.ceil(this.sortedMovies.length / this.per_page);
            return Array.apply(null, Array(total)).map((x, idx) => idx);
        }
    },
    methods: {
        sort_movies(sortedMovies) {
            this.sortedMovies = sortedMovies;
        },
        filter_movies(filteredMovies) {
            this.filteredMovies = filteredMovies;
        }
    },
    watch: {
        "$store.state.movies": {
            handler(newMovies) {
                this.movies = newMovies;
                this.sortedMovies = newMovies;
                this.filteredMovies = newMovies;
            },
            deep: true,
        }
    }
}

</script>

<style scoped>
.page-link {
    cursor: pointer;
}
</style>
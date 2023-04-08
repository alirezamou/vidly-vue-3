<template>
    <div>
        <div class="d-flex justify-content-evenly">

            <div class="row container-md mt-2" style="min-width: 768px;">
                <div class="col-3">
                    <ListGroupGenres :selectedGenre="selectedGenre" @changeGenre="change_genre" />
                </div>
                <div class="col-9">
                    <search
                    :movies="movies"
                    @filteredMovies="filter_movies"
                    @searchTerm="(value) => searchTerm = value"
                    />
            
                    <table v-if="movies.length" class="table">
                        <sorted :movies="filteredMovies" @sortedMovies="sort_movies"/>
            
                        <paginated :items="paginatedMovies" :per_page="per_page" :current_page="current_page"/>
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
                </div>
            </div>

            <router-link to="/movies/add" class="btn btn-primary align-self-start text-nowrap">
                <fa-icon icon="fa-solid fa-plus"></fa-icon>
                Add Movie
            </router-link>
        </div>

        <router-view />
    </div>


</template>

<script>
import PaginatedTableBody from './PaginatedTableBody.vue';
import MoviesSort from "./MoviesSort.vue";
import MoviesSearch from './MoviesSearch.vue';
import ListGroupGenres from './ListGroupGenres.vue';

export default {
    name: "MoviesIndex",
    components: {
        "paginated": PaginatedTableBody,
        "sorted": MoviesSort,
        "search": MoviesSearch,
        ListGroupGenres,
    },
    data() {
        return {
            movies: this.$store.state.movies,
            sortedMovies: this.$store.state.movies,
            filteredMovies: this.$store.state.movies,
            per_page: 5,
            current_page: 0,
            selectedGenre: {},
            searchTerm: "",
        }
    },
    computed: {
        totalPages() {
            const total = Math.ceil(this.paginatedMovies.length / this.per_page);
            return Array.apply(null, Array(total)).map((x, idx) => idx);
        },
        paginatedMovies() {
            if(this.searchTerm) {
                return this.sortedMovies;
            } else {
                if(this.selectedGenre._id) {
                    return this.sortedMovies.filter(movie => movie.genre.name === this.selectedGenre.name);
                } else {
                    return this.sortedMovies;
                }
            }
        }
    },
    methods: {
        sort_movies(sortedMovies) {
            this.sortedMovies = sortedMovies;
        },
        filter_movies(filteredMovies) {
            this.filteredMovies = filteredMovies;
        },
        change_genre(genre) {
            this.selectedGenre = genre;
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
        },
        selectedGenre: {
            handler() {
                this.current_page = 0;
            },
            deep: true,
        },
    }
}

</script>

<style scoped>
.page-link {
    cursor: pointer;
}
</style>
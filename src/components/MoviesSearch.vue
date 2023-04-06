<template>
    <input type="text" v-model="searchTerm" class="form-control mb-2" placeholder="Search by title and genre" />
</template>

<script>

export default {
    name: "MoviesSearch",
    props: {
        movies: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            searchTerm: ""
        };
    },
    methods: {
        search() {
            if(this.searchTerm === "") {
                this.$emit("filteredMovies", this.movies);
                return;
            }
            const filteredMovies = this.movies.filter(movie => movie.title.toLowerCase().includes(this.searchTerm) || movie.genre.name.toLowerCase().includes(this.searchTerm));
            this.$emit("filteredMovies", filteredMovies);
        }
    },
    watch: {
        movies() {
            this.searchTerm = "";
        },
        searchTerm() {
            this.search();
            this.$emit("searchTerm", this.searchTerm);
        }
    }
}
</script>

<style lang="">
    
</style>
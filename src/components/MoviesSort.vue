<template>
    <thead>
        <tr>
            <th><a @click="change_sort('title')">
                Title
                <fa-icon v-if="sortBy === 'title' && sortOrder === 'asc'" icon="fa-solid fa-chevron-up" />
                <fa-icon v-if="sortBy === 'title' && sortOrder === 'desc'" icon="fa-solid fa-chevron-down" />
            </a></th>
            <th><a @click="change_sort('genre.name')">
                Genre
                <fa-icon v-if="sortBy === 'genre.name' && sortOrder === 'asc'" icon="fa-solid fa-chevron-up" />
                <fa-icon v-if="sortBy === 'genre.name' && sortOrder === 'desc'" icon="fa-solid fa-chevron-down" />
            </a></th>
            <th><a @click="change_sort('numberInStock')">
                Stock
                <fa-icon v-if="sortBy === 'numberInStock' && sortOrder === 'asc'" icon="fa-solid fa-chevron-up" />
                <fa-icon v-if="sortBy === 'numberInStock' && sortOrder === 'desc'" icon="fa-solid fa-chevron-down" />
            </a></th>
            <th><a @click="change_sort('dailyRentalRate')">
                Rate
                <fa-icon v-if="sortBy === 'dailyRentalRate' && sortOrder === 'asc'" icon="fa-solid fa-chevron-up" />
                <fa-icon v-if="sortBy === 'dailyRentalRate' && sortOrder === 'desc'" icon="fa-solid fa-chevron-down" />
            </a></th>
            <th></th>
        </tr>
    </thead>
</template>

<script>
import { orderBy } from "lodash";

export default {
    name: "MoviesSort",
    props: {
        movies: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            sortBy: "",
            sortOrder: "asc"
        };
    },
    methods: {
        change_sort(column) {
            if(this.sortBy === column && this.sortOrder === "asc") {
                this.sortOrder = "desc";
            } else {
                this.sortOrder = "asc";
            }

            this.sortBy = column;

            this.sort_movies();
        },
        sort_movies() {
            if(this.sortBy === "") {
                this.$emit("sortedMovies", this.movies);
                return;
            }
            const sortedMovies = orderBy(this.movies, this.sortBy, this.sortOrder);
            this.$emit("sortedMovies", sortedMovies);
        }
    },
    watch: {
        movies() {
            this.sort_movies();
        }
    }
}

</script>
<style lang="">
    
</style>
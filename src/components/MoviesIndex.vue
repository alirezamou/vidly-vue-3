<template>
    <table v-if="movies.length" class="table">
        <thead>
            <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(movie, movieIndex) in movies" :key="movieIndex">
                <td>{{ movie.title }}</td>
                <td>{{ movie.genre.name }}</td>
                <td>{{ movie.numberInStock }}</td>
                <td>{{ movie.dailyRentalRate }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>

export default {
    name: "MoviesIndex",
    computed: {
        movies() {
            return this.$store.state.movies;
        }
    }
}

</script>

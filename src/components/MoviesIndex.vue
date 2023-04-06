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
        <paginated :items="movies" :per_page="per_page" :current_page="current_page"/>
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

</template>

<script>
import PaginatedTableBody from './PaginatedTableBody.vue';

export default {
    name: "MoviesIndex",
    components: {
        "paginated": PaginatedTableBody,
    },
    data() {
        return {
            per_page: 5,
            current_page: 0
        }
    },
    computed: {
        movies() {
            return this.$store.state.movies;
        },
        totalPages() {
            const total = Math.ceil(this.movies.length / this.per_page);
            return Array.apply(null, Array(total)).map((x, idx) => idx);
        }
    }
}

</script>

<style scoped>
.page-link {
    cursor: pointer;
}
</style>
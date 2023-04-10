<template>
    <tbody>
        <template v-for="(item, idx) in paginatedItems" :key="idx">
            <tr>
                <td>
                  <router-link class="movie-link" :to="'/movies/movie/' + item._id">{{ item.title }}</router-link>
                </td>
                <td>{{ item.genre.name }}</td>
                <td>{{ item.numberInStock }}</td>
                <td>{{ item.dailyRentalRate }}</td>
                <td>
                    <button v-if="!loading" class="btn text-secondary" id="delete-movie-button" @click="deleteMovie(item)">
                        <fa-icon icon="fa-solid fa-trash"></fa-icon>
                    </button>
                    <loading v-if="loading" />
                </td>
            </tr>
        </template>
    </tbody>
</template>

<script>
import LoadingOverlay from "@/components/LoadingOverlay.vue";

export default {
    name: "Paginated",
    components: {
        loading: LoadingOverlay
    },
    data() {
        return {
            loading: false,
        };
    },
    props: {
        items: {
            type: Array,
            required: true,
        },
        per_page: {
            type: Number,
            default: 5,
            required: false,
        },
        current_page: {
            type: Number,
            default: 0,
            required: true,
        }
    },
    computed: {
        totalPage() {
            return Math.ceil(this.items.length / per_page);
        },
        paginatedItems() {
            const indexStart = this.per_page * this.current_page;
            const indexEnd = this.per_page * (this.current_page + 1);

            return this.items.slice(indexStart, indexEnd);
        }
    }
}
</script>

<style scoped>

.movie-link {
    text-decoration: none;
    color: rgba(50, 50, 200, 0.8);
}
.movie-link:hover {
    color: rgba(50, 50, 255, 1);
}
#delete-movie-button:hover {
    color: red !important;
}
</style>
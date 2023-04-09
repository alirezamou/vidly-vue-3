<template>
    <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: selectedGenre.name === 'All'}"
          @click="changeGenre({ name: 'All' })"
        >
        All
        </li>
        <li
          class="list-group-item"
          v-for="(genre, index) in genres"
          :key="index"
          :class="{ active: selectedGenre.name === genre.name }"
          @click="changeGenre(genre)"
        >
        {{ genre.name }}
        </li>
    </ul>

    <router-link to="/movies/add-genre" class="btn btn-secondary align-self-start text-nowrap float-end mt-3">
        <fa-icon icon="fa-solid fa-plus"></fa-icon>
        Add Genre
    </router-link>

    <router-view />
</template>

<script>
export default {
    name: "ListGroupGenres",
    emits: ['changeGenre'],
    props: {
        selectedGenre: {
            type: Object,
            required: false,
            default: {},
        },
    },
    data() {
        return {
            genres: this.$store.state.genres,
        };
    },
    methods: {
        changeGenre(genre) {
            if(genre.name === this.selectedGenre.name) return;

            this.$emit("changeGenre", genre);
        }
    },
    watch: {
        "$store.state.genres": {
            handler(newGenres) {
                this.genres = newGenres;
            },
            deep: true,
        },
    },
}
</script>

<style scoped>
.list-group-item {
    cursor: pointer;
}
</style>
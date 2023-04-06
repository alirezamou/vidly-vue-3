<template>
    <ul class="list-group">
        <li
          class="list-group-item"
          v-for="(genre, index) in newGenres"
          :key="index"
          :class="{ active: selectedGenre.name === genre.name }"
          @click="changeGenre(genre)"
        >
        {{ genre.name }}
        </li>
    </ul>
</template>

<script>
import { toRaw } from 'vue';
export default {
    name: "ListGroupGenres",
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
    computed: {
        newGenres() {
            const temp = toRaw(this.genres)
            temp.unshift({ name: "All" });
            return temp;
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
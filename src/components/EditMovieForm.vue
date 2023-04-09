<template>

<Teleport to="body">
    <div class="modal fade show position-absolute top-0 left-50" id="modalStatic" tabindex="-1" aria-labelledby="modalStaticTitle" style="display: block; position: relative; z-index: 3;">
        <div class="modal-dialog modal-fullscreen-md-down modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalStaticTitle">Edit Movie</h5>
                    <button @click="cancelAdd" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <div v-if="error" class="alert alert-danger">{{ error }}</div>
                        <VForm @submit="handleSubmit">
                            <div class="form-group mb-4">
                                <label for="movieTitle" class="form-label text-muted">Title</label>
                                <VField
                                name="movieTitle"
                                type="text"
                                class="form-control"
                                v-model="title"
                                auocomplete="off"
                                placeholder="Movie Title"
                                autofocus
                                :rules="(value) => value.trim() ? true : 'Title is required'"
                                />
                                <ErrorMessage name="movieTitle" class="form-text text-danger" />
                            </div>
        
                            <div class="form-group mb-4">
                                <label for="movieGenre" class="form-label text-muted">Genre</label>
                                <VField
                                name="movieGenre"
                                as="select"
                                class="form-select"
                                id="movieGenre"
                                aria-label="Genre"
                                v-model="genreId"
                                :rules="(value) => value ? true : 'select a genre'"
                                >
                                    <option selected="" value="" disabled>Select genre</option>
                                    <option v-for="genre in genres" :value="genre._id" :key="genre._id">{{ genre.name }}</option>
                                </VField>
                                <ErrorMessage name="movieGenre" class="form-text text-danger" />
                            </div>
        
                            <div class="form-group mb-4">
                                <label for="numberInStockMovie" class="form-label text-muted">Number in stock</label>
                                <VField
                                name="numberInStockMovie"
                                type="text"
                                class="form-control"
                                v-model="numberInStock"
                                autocomplete="off"
                                placeholder="Number in stock"
                                :rules="validateNumberInStockField"
                                />
                                <ErrorMessage name="numberInStockMovie" class="form-text text-danger" />
                            </div>
        
                            <div class="form-group mb-4">
                                <label for="dailyRentalRate" class="form-label text-muted">Daily rental rate</label>
                                <VField
                                name="dailyRentalRate"
                                type="text"
                                class="form-control"
                                v-model="dailyRentalRate"
                                autocomplete="off"
                                placeholder="Daily rental rate"
                                :rules="validateDailyRentalRateField"
                                />
                                <ErrorMessage name="dailyRentalRate" class="form-text text-danger" />
                            </div>
        
                            <hr />
                            
                            <div class="d-flex justify-content-end gap">
                                <button type="submit" class="btn btn-primary me-2">
                                    <span v-if="!loading">Update</span>
                                    <loading v-if="loading" />
                                </button>
                                <button @click="cancelAdd" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </VForm>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Teleport>
    
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import LoadingOverlay from "@/components/LoadingOverlay.vue";

export default {
    name: "EditMovie",
    components: {
        VForm: Form,
        VField: Field,
        ErrorMessage,
        loading: LoadingOverlay,
    },
    created() {
        const movieId = this.$route.params.id;
        const movie = this.$store.getters.getMovie(movieId);

        if(movie) {
            this.title = movie.title;
            this.genreId = movie.genre._id;
            this.numberInStock = movie.numberInStock;
            this.dailyRentalRate = movie.dailyRentalRate;
        } else {
            this.error = "Unable to find movie.";
        }
    },
    data() {
        return {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: "",
            error: null,
            loading: false,
        };
    },
    computed: {
        genres() {
            return this.$store.state.genres;
        },
        movieId() {
            return this.$route.params.id;
        }
    },
    methods: {
        async handleSubmit() {
            this.loading = true;

            const genre = this.genres.find(g => g._id === this.genreId);

            const movie = {
                _id: this.movieId,
                title: this.title.trim(),
                genre: genre,
                numberInStock: parseInt(this.numberInStock),
                dailyRentalRate: parseFloat(this.dailyRentalRate),
            }

            try {
                await this.$store.dispatch("updateMovie", movie);
                this.loading = false;
                this.$router.push("/movies");
            } catch(error) {
                this.error = error.message;
            }
        },
        cancelAdd() {
            this.$router.push("/movies");
        },
        validateNumberInStockField(value) {
            if(!value) {
                return "This field is required";
            }

            if(isNaN(value) || (parseFloat(value) < 0) || (parseFloat(value) % 1 !== 0)) {
                return "Please enter a valid number";
            }

            return true;
        },
        validateDailyRentalRateField(value) {
            if(!value) {
                return "This field is required";
            }

            if(isNaN(value) || parseFloat(value) < 0) {
                return "Please enter a valid number";
            }

            return true;
        }
    }
}
</script>
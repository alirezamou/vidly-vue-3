<template>

  <div class="modal fade show position-absolute top-0 left-50" id="modalStatic" tabindex="-1" aria-labelledby="modalStaticTitle" style="display: block; position: relative; z-index: 3;">
    <div class="modal-dialog modal-fullscreen-md-down modal-md">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalStaticTitle">Add Movie</h5>
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
                        placeholder="Movie Title"
                        autofocus
                        :rules="(value) => value ? true : 'Title is required'"
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
                        placeholder="Daily rental rate"
                        :rules="validateDailyRentalRateField"
                        />
                        <ErrorMessage name="dailyRentalRate" class="form-text text-danger" />
                    </div>

                </VForm>
            </div>
        </div>
        <div class="modal-footer">
            <button @click="handleSubmit" type="button" class="btn btn-primary">Save</button>
            <button @click="cancelAdd" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        </div>
        </div>
    </div>
</div>
    
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    name: "AddMovie",
    components: {
        VForm: Form,
        VField: Field,
        ErrorMessage,
    },
    data() {
        return {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: "",
            error: null,
        };
    },
    computed: {
        genres() {
            return this.$store.state.genres;
        }
    },
    methods: {
        async handleSubmit() {
            const genre = this.genres.find(g => g._id === this.genreId);

            const movie = {
                title: this.title,
                genre: genre,
                numberInStock: this.numberInStock,
                dailyRentalRate: this.dailyRentalRate,
            }

            try {
                await this.$store.dispatch("addMovie", movie);
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

            if(isNaN(value)) {
                return "Please enter a valid number";
            }

            return true;
        },
        validateDailyRentalRateField(value) {
            if(!value) {
                return "This field is required";
            }

            if(isNaN(value)) {
                return "Please enter a valid number";
            }

            return true;
        }
    }
}
</script>
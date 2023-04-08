<template>
    <div class="container mt-5">
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
                  v-model="genre"
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
            genre: "",
            numberInStock: "",
            dailyRentalRate: "",
        };
    },
    computed: {
        genres() {
            return this.$store.state.genres;
        }
    },
    methods: {
        async handleSubmit() {
            const movie = {
                title: this.title,
                genre: this.genre,
                numberInStock: this.numberInStock,
                dailyRentalRate: this.dailyRentalRate,
            }

            try {
                await this.$store.dispatch("addMovie", movie);
            } catch(error) {
                console.log(error);
            }
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
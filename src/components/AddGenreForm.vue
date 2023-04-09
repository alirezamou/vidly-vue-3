<template>
    <Teleport to="body">
        <div class="modal fade show position-absolute top-0 left-50" id="modalStatic" tabindex="-1" aria-labelledby="modalStaticTitle" style="display: block; position: relative; z-index: 3;">
            <div class="modal-dialog modal-fullscreen-md-down modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalStaticTitle">Add Genre</h5>
                        <button @click="cancelAdd" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div v-if="error" class="alert alert-danger">{{ error }}</div>
                            <VForm @submit="handleSubmit">
                                <div class="form-group mb-4">
                                    <label for="genreName" class="form-label text-muted">Name</label>
                                    <VField
                                    name="genreName"
                                    type="text"
                                    class="form-control"
                                    v-model="genreName"
                                    placeholder="Genre Name"
                                    autofocus
                                    autocomplete="off"
                                    :rules="(value) => value ? true : 'Name is required'"
                                    />
                                    <ErrorMessage name="genreName" class="form-text text-danger" />
                                </div>
            
                                <hr />
                                
                                <div class="d-flex justify-content-end gap">
                                    <button type="submit" class="btn btn-primary me-2">
                                        <span v-if="!loading">Add genre</span>
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
    name: "AddGenre",
    components: {
        VForm: Form,
        VField: Field,
        ErrorMessage,
        "loading": LoadingOverlay,
    },
    data() {
        return {
            genreName: "",
            loading: false,
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
            try {
                this.loading = true;
                await this.$store.dispatch("addGenre", this.genreName);
                this.loading = false;
                this.$router.push("/movies");
            } catch(error) {
                this.error = "Unable to add genre now. please try again later";
                console.log(error);
            }
        },
        cancelAdd() {
            this.$router.push("/movies");
        },
    }
}
</script>
<template>
    <div class="container-md mt-4 col-md-6" style="min-width: 576px;">
        <h2 class="h2 text-muted mb-2 mt-2">Register</h2>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>

        <Form @submit="handleRegister">
            <div class="form-group mb-4">
                <label for="usernameInput" class="form-label">Username</label>
                <Field
                  id="usernameInput"
                  name="usernameInput"
                  type="text"
                  class="form-control"
                  placeholder="Enter your username"
                  autocomplete="off"
                  autofocus
                  v-model="username"
                  :rules="validateUsername"
                />
                <ErrorMessage name="usernameInput" class="form-text text-danger" />
            </div>

            <div class="form-group mb-4">
                <label for="emailInput" class="form-label">Email</label>
                <Field
                  id="emailInput"
                  name="emailInput"
                  type="email"
                  class="form-control"
                  placeholder="Your@email.address"
                  v-model="email"
                  :rules="validateEmail"
                />
                <ErrorMessage name="emailInput" class="form-text text-danger" />
            </div>

            <div class="form-group mb-4">
                <label for="passwordInput" class="form-label">Password</label>
                <Field
                  id="passwordInput"
                  name="passwordInput"
                  type="password"
                  class="form-control"
                  placeholder="Your password"
                  v-model="password"
                  :rules="validatePassword"
                />
                <ErrorMessage name="passwordInput" class="form-text text-danger" />
            </div>

            <div class="form-group mb-0">
                <div class="col-sm-3 col-md-4 offset-md-8">
                    <button type="submit" class="btn btn-primary w-100">Register</button>
                </div>
            </div>
        </Form>
        <router-link to="/login">
            <p class="to-register-link fw-light fs-6">Already have an account? Login</p>
        </router-link>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    name: "RegisterComponent",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            email: "",
            password: "",
            username: "",
            error: null,
        };
    },
    methods: {
        validateUsername(value) {
            if(!value) {
                return "Username required";
            }

            return true;
        },
        validateEmail(value) {
            if (!value) {
              return 'Please enter an email address';
            }
        
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!regex.test(value)) {
              return 'Enter a valid email address';
            }
        
            return true;
        },
        validatePassword(value) {
            if(!value) {
                return "Please enter a password";
            }

            if(value.length < 6) {
                return "Password length must be at least 6 character long";
            }

            return true;
        },
        async handleRegister() {
            try {
                await this.$store.dispatch("register", {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                });

                this.$router.push("/");
            } catch(error) {
                this.error = error.message;
            }
        }
    }
}
</script>
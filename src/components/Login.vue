<template>
    <div class="container-md mt-4 col-md-6">
        <h2 class="h2 text-muted mb-2 mt-2">Login</h2>
        <div v-if="error" class="alert alert-danger mb-2">{{ error }}</div>

        <Form @submit="handleLogin">
            <div class="form-group mb-4">
                <label for="emailInput" class="form-label">Email</label>
                <Field
                  id="emailInput"
                  type="email"
                  name="email"
                  class="form-control"
                  placeholder="Your@email.address"
                  autocomplete="off"
                  autofocus
                  v-model="email"
                  :rules="validateEmail"
                />
                <ErrorMessage name="email" class="form-text text-danger"/>
            </div>
            <div class="form-group mb-4">
                <label for="passwordInput" class="form-label">Password</label>
                <Field
                  id="passwordInput"
                  type="password"
                  name="password"
                  class="form-control"
                  placeholder="Your password"
                  v-model="password"
                  :rules="validatePassword"
                />
                <ErrorMessage name="password" class="form-text text-danger" />
            </div>
            <div class="form-group row mb-0">
                <div class="col-sm-3 col-md-4 offset-md-8">
                    <button class="btn btn-primary w-100" type="submit">Login</button>
                </div>
            </div>
        </Form>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    name: "LoginComponent",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            email: "",
            password: "",
            error: null,
        };
    },
    methods: {
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
        async handleLogin() {
            try {
                await this.$store.dispatch("login", {
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

<template>
    <div class="container-sm mt-4">
        <div v-if="isLoggingOut">
            <h3 class="h3 text-muted mb-4">Logging out</h3>
            <KineticLoader />    
        </div>
    
        <div v-if="!isLoggingOut && !error" class="alert alert-success w-50">You've been logged out successfully</div>
    
        <div v-if="error" class="alert alert-danger w-50">{{ error }}</div>
    </div>
</template>
<script>
import KineticLoader from './KineticLoader.vue';

export default {
    name: "LogoutComponent",
    components: {
        KineticLoader,
    },
    async created() {
        try {
            await this.$store.dispatch("logout");
            this.isLoggingOut = false;
            setTimeout(() => {
                this.$router.push("/");
            }, 500);
        } catch(error) {
            this.isLoggingOut = false;
            this.error = error.message;
            setTimeout(() => {
                this.$router.push("/");
            }, 1000);
        }
    },
    data() {
        return {
            error: null,
            isLoggingOut: false,
        };
    },
}
</script>
<style>
    
</style>
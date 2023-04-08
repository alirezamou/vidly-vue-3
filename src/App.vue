<script>
</script>

<template>
  <NavBar />

  <router-view />
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "AppComponent",
  components: {
    NavBar,
  }
}
</script>

<style scoped>
</style>

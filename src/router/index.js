import { createRouter, createWebHistory } from "vue-router";

import MoviesIndex from "@/components/MoviesIndex.vue";
import Login from "@/components/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "movies",
      path: "/",
      component: MoviesIndex,
    },
    {
      name: "login",
      path: "/login",
      component: Login,
    },
  ],
});

export default router;

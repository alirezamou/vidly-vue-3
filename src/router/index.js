import { createRouter, createWebHistory } from "vue-router";

import MoviesIndex from "@/components/MoviesIndex.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "movies",
      path: "/",
      component: MoviesIndex,
    },
  ],
});

export default router;

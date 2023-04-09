import { createRouter, createWebHistory } from "vue-router";

import MoviesIndex from "@/components/MoviesIndex.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import Logout from "@/components/Logout.vue";
import AddMovieForm from "@/components/AddMovieForm.vue";
import AddGenreForm from "@/components/AddGenreForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "moviesIndex",
      path: "/",
      component: MoviesIndex,
    },
    {
      name: "movies",
      path: "/movies",
      component: MoviesIndex,
      children: [
        {
          path: "add",
          component: AddMovieForm,
        },
        {
          path: "add-genre",
          component: AddGenreForm,
        },
      ],
    },
    {
      name: "login",
      path: "/login",
      component: Login,
    },
    {
      name: "register",
      path: "/register",
      component: Register,
    },
    {
      name: "logout",
      path: "/logout",
      component: Logout,
    },
  ],
});

export default router;

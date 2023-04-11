import { createRouter, createWebHistory } from "vue-router";

import { isAuthenticated } from "@/library/authServices";

import MoviesIndex from "@/components/MoviesIndex.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import Logout from "@/components/Logout.vue";
import AddMovieForm from "@/components/AddMovieForm.vue";
import AddGenreForm from "@/components/AddGenreForm.vue";
import EditMovieForm from "@/components/EditMovieForm.vue";

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
        {
          path: "movie/:id",
          component: EditMovieForm,
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

router.beforeEach(async (to, _from, next) => {
  if (!isAuthenticated()) {
    if (to.path === "/login" || to.path === "/register") {
      next();
      return;
    }
    if (to.path !== "/login") {
      next({
        path: "/login",
      });
      return;
    }
  } else {
    if (to.path === "/login") {
      return { name: "movies" };
    }
  }
});

export default router;

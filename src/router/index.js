// ----------UTILS----------//
import { createRouter, createWebHistory } from "vue-router";

// ----------ROUTERS----------//
import routerPosts from "../modules/posts/router/index.js";

// -----------FUNCTIONS----------//
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../home/views/HomeView.vue"),
      meta: { showNavbar: true },
    },
    {
      path: "/post",
      name: "post",
      meta: {
        title: "Post",
      },
      component: () => import("../modules/posts/layouts/layout.vue"),
      children: routerPosts,
      meta: { showNavbar: true },
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../auth/views/AuthView.vue"),
      meta: { showNavbar: false },
    },
  ],
});

export default router;

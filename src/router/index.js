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
    },
    {
      path: "/post",
      name: "post",
      meta: {
        title: "Post",
      },
      component: () => import("../modules/posts/layouts/layout.vue"),
      children: routerPosts,
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../auth/views/RegisterView.vue"),
      meta: { hideNavbar: true },
    },
  ],
});

export default router;

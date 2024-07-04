// ----------UTILS----------//
import { createRouter, createWebHistory } from "vue-router";

// -----------FUNCTIONS----------//
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../home/views/HomeView.vue")
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

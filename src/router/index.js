import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../register/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: { hideNavbar: true },
    },
  ],
});

export default router;

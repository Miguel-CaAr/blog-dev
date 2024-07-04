// ----------UTILS----------//
import { createRouter, createWebHistory } from "vue-router";

// ----------COMPONENTS----------//
import HomeView from "../home/views/HomeView.vue";
import RegisterView from "../auth/views/RegisterView.vue";

// -----------FUNCTIONS----------//
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

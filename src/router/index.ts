import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/newHomeView.vue"),
    },
    {
      path: "/game",
      name: "game",
      component: () => import("../views/newGameView.vue"),
    },
    {
      path: "/result",
      name: "result",
      component: () => import("../views/newResultView.vue"),
    },
    {
      path: "/myPage",
      name: "myPage",
      component: () => import("../views/myPageView.vue"),
    },
  ],
});

export default router;

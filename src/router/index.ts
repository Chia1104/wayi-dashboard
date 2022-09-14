import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  NavigationGuardNext,
} from "vue-router";
import { auth } from "@wanin/helpers/firebase/firebase.config";
import { useStorage } from "@vueuse/core";
import { Activity } from "@wanin/shared/types";

const DashboardPage = () => import("../pages/DashboardPage");
const SlugPage = () => import("../pages/DashboardPage/[slug]");
const LoginPage = () => import("../pages/LoginPage");
const ChartPage = () => import("../pages/DashboardPage/[slug]/ChartPage");
const FakeCountPage = () => import("../pages/DashboardPage/[slug]/FakePage");
const PlayerListPage = () =>
  import("../pages/DashboardPage/[slug]/PlayerListPage");
const NotFoundPage = () => import("../pages/exception/404.vue");

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "DashboardPage",
    component: DashboardPage,
  },
  {
    path: "/dashboard/:slug",
    name: "SlugPage",
    component: SlugPage,
    children: [
      {
        path: "chart",
        name: "ChartPage",
        component: ChartPage,
      },
      {
        path: "fake-count",
        name: "FakeCountPage",
        component: FakeCountPage,
      },
      {
        path: "player-list",
        name: "PlayerListPage",
        component: PlayerListPage,
      },
    ],
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const slugPath = localStorage.getItem("slugPath");
      if (slugPath) {
        JSON.parse(slugPath).find(
          (slug: Activity) => slug.slug === to.params.slug
        )
          ? next()
          : next("/404");
      } else {
        next("/dashboard");
      }
    },
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFoundPage",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged((user) => {
    if (to.name === "LoginPage" || to.name === "RegisterPage") {
      if (user) next("/");
      else next();
    } else {
      if (user) next();
      else next("/login");
    }
  });
});

export default router;

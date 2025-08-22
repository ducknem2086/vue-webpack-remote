import { createApp } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import App from "./App.vue";

const Home = () => import("./components/HelloWorld.vue");

// Types come from env.d.ts's module declaration

const routes: RouteRecordRaw[] = [
  {
    path: "",
    redirect: "/page1",
  },
  {
    path: "/page1",
    component: () => import("./pages/Page1Component.vue"),
  },
  {
    path: "/page2",
    component: () => import("./pages/Page2Component.vue"),
  },
  {
    path: "/page3",
    component: () => import("./pages/Page3Component.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");

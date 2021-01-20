import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

const Page = (resolve) => {
  require.ensure(
    ["../views/Home.vue"],
    () => {
      resolve(require("../views/Home.vue"));
    },
    "user" // [[ 16 - 26 @06:00 ]] we can also group them into one bundle by having the argv2 like this 'user' group bundle
  );
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: "/",
    name: "Page",
    component: Page,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import PokemonDetails from "../views/PokemonDetails.vue";

const Page = (resolve) => {
  require.ensure(
    ["../views/Home.vue"],
    () => {
      resolve(require("../views/Home.vue"));
    },
    "user" // [[ 16 - 26 @06:00 ]] we can also group them into one bundle by having the argv2 like this 'user' group bundle
  );
};

const PokeDetails = (resolve) => {
  require.ensure(
    ["../views/PokemonDetails.vue"],
    () => {
      resolve(require("../views/PokemonDetails.vue"));
    },
    "user" // [[ 16 - 26 @06:00 ]] we can also group them into one bundle by having the argv2 like this 'user' group bundle
  );
};

const ErrorPage = (resolve) => {
  require.ensure(
    ["../components/PokeNotFound.vue"],
    () => {
      resolve(require("../components/PokeNotFound.vue"));
    },
    "user" // [[ 16 - 26 @06:00 ]] we can also group them into one bundle by having the argv2 like this 'user' group bundle
  );
};

const AboutPage = (resolve) => {
  require.ensure(
    ["../components/About.vue"],
    () => {
      resolve(require("../components/About.vue"));
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
    exact: true,
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
    path: "/page/:id",
    name: "Page",
    component: Page,
  },
  {
    path: "/pokemon/:name",
    name: "PokemonPage",
    component: PokeDetails,
  },
  {
    path: "/NotFound",
    name: "ErrorPage",
    component: ErrorPage,
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

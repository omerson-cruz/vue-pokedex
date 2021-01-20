import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import "./plugins/axios"; // will set the global axios

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: "fas",
});

Vue.config.devtools = true; // Disable Vue Devtools

new Vue({
  router,
  store,

  render: (h) => h(App),
}).$mount("#app");

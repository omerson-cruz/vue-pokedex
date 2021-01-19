import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: "fas",
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");

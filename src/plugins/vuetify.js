import Vue from "vue";
import Vuetify, { VPagination } from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  components: {
    VPagination,
  },
  theme: {
    themes: {
      dark: {
        primary: "#8c67ef",
        secondary: "#b0bec5",
        accent: "#8c9eff",
        error: "#b71c1c",
      },
    },
  },
});

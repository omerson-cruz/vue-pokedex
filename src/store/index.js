import Vue from "vue";
import Vuex from "vuex";
import globalAxios from "axios";
import { pokemonApi } from "../plugins/axios";
import createPersistedState from "vuex-persistedstate";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      path: [],
    }),
  ],

  state: {
    isLoadingData: false,
    hasNoData: false,
    totalCount: 0,
    pokemonList: [], //==> will contain the pokemon list items
  },
  mutations: {
    setLoading: (state, payload) => {
      state.isLoadingData = payload;
    },
    setHasNoData: (state, payload) => {
      state.hasNoData = payload;
    },
    setTotalCount: (state, payload) => {
      state.totalCount = payload;
    },
  },
  actions: {
    loadPokemonList: async ({ commit, dispatch }, payload) => {
      console.log("loading Data");
      commit("setLoading", true);

      try {
        const res = await globalAxios.get("/pokemon");

        if (res.status === 200 && res.data) {
          console.log("response: ", res.data);
          const { data } = res;
        } else {
          throw new Error("Failed to fetch the data from server");
        }
      } catch (err) {
        console.error(err);
        commit("setLoading", false);
        commit("setHasNoData", true);
        return; //== need to return in order to NOT proceed to the commits below
      }

      commit("setLoading", false);
      commit("setHasNoData", false);
    },
  },
  getters: {
    isLoadingData: (state) => state.isLoadingData,
    hasNoData: (state) => state.hasNoData,
    totalCount: (state) => state.totalCount,
  },

  modules: {},
});

import Vue from "vue";
import Vuex from "vuex";
import globalAxios from "axios";
import { pokemonApi } from "../plugins/axios";

import { fetchPokemonDataPromise } from "../utilities/fetchDataUtils";

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
    nextPage: null,
    prevPage: null,

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
    setNextPage: (state, payload) => {
      state.nextPage = payload;
    },
    setPrevPage: (state, payload) => {
      state.prevPage = payload;
    },
    setPokemonList: (state, payload) => {
      state.pokemonList = payload;
    },
  },
  actions: {
    loadPokemonList: async (
      { commit, dispatch },
      // default first page
      payload = { offset: 0, limit: 20 }
    ) => {
      console.log("loading Data");
      commit("setLoading", true);

      try {
        const res = await globalAxios.get("/pokemon", {
          params: {
            offset: payload.offset,
            limit: payload.limit,
          },
        });

        if (res.status === 200 && res.data) {
          console.log("response: ", res.data);
          const {
            data: { next, previous, count, results },
          } = res;
          /**
           * data.count
           * data.next
           * data.previous
           * data.results
           */
          commit("setNextPage", next);
          commit("setPrevPage", previous);
          commit("setTotalCount", count);
          dispatch("getPokemonDetails", results);
        } else {
          throw new Error("Failed to fetch the data from server");
        }
      } catch (err) {
        console.error(err);
        commit("setLoading", false);
        commit("setHasNoData", true);
        return; //== need to return to AVOID executing the commits below
      }

      commit("setLoading", false);
      commit("setHasNoData", false);
    },

    getPokemonDetails({ commit }, payload) {
      console.log("getPokemonDetails", payload);
      let promiseArray = [];

      // promiseArray = payload.map((pokemon, index) => {
      //   return new Promise((resolve, reject) => {
      //     setTimeout(() => {
      //       resolve(pokemon.name);
      //     }, 1000 * index);
      //   }).then((poke_data) => {
      //     return poke_data;
      //   });
      // });

      promiseArray = payload.map((pokemon, index) => {
        return fetchPokemonDataPromise(pokemon, index);
      });

      Promise.all(promiseArray).then((values) => {
        console.log("Pokemon List Collections: ", values);
      });
    },
  },
  getters: {
    isLoadingData: (state) => state.isLoadingData,
    hasNoData: (state) => state.hasNoData,
    totalCount: (state) => state.totalCount,
    nextPage: (state) => state.nextPage,
    prevPage: (state) => state.prevPage,
  },

  modules: {},
});

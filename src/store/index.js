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
    isLoadingData: true,
    hasNoData: false,
    totalCount: 0,
    nextPage: null,
    prevPage: null,

    pokemonList: [], //==> will contain the pokemon list items
    pokemonIndividual: {}, //=> will contain details for single pokemon
    currentStoreIndex: 0,

    pageOffset: 0,
    pageLimit: 20,
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
    setPageOffset: (state, payload) => {
      state.pageOffset = payload;
    },
    setCurrentPokemonIndex: (state, payload) => {
      // console.log("setting current index");
      state.currentStoreIndex = payload;
    },
  },
  actions: {
    loadPokemonList: async (
      { commit, dispatch, state },
      // default first page
      payload = { offset: state.pageOffset, limit: state.pageLimit }
    ) => {
      // console.log("loading Data");
      commit("setLoading", true);

      // console.log("Fetch Pokemon payload: ", payload);

      let urlString = `/pokemon?offset=${payload.offset}&limit=${payload.limit}`;

      try {
        const res = await globalAxios.get(urlString);
        if (res.status === 200 && res.data) {
          // console.log("response: ", res.data);
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
    },

    getPokemonDetails({ commit }, payload) {
      // console.log("getPokemonDetails", payload);
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
        // console.log("Pokemon List Collections: ", values);
        commit("setPokemonList", values);

        commit("setLoading", false);
        commit("setHasNoData", false);
      });
    },
    setPageOffset: ({ commit, dispatch, state }, payload) => {
      commit("setPageOffset", payload);
      // console.log("loadPokemonlist, ");

      let arg = {
        offset: payload,
        limit: state.pageLimit,
      };

      // console.log("arg: ", arg);

      dispatch("loadPokemonList", arg);
    },

    setCurrentPokemonIndex: ({ commit }, payload) => {
      // console.log("setCurrentPokemonIndex", payload);

      commit("setCurrentPokemonIndex", payload.store_index);
      router.push(`/pokemon/${payload.pokemonName}`);
    },

    searchPokemon: async ({ commit, dispatch }, payload) => {
      commit("setCurrentPokemonIndex", 0);
      // console.log("searchPokemon");

      const pokemonName = "" + payload.toLowerCase();

      let urlString = "/pokemon/" + pokemonName;

      try {
        const res = await globalAxios.get(urlString);
        if (res.status === 200 && res.data) {
          // console.log("response: ", res.data);
          const {
            data: { id, name },
          } = res;
          /**
           * data.count
           * data.next
           * data.previous
           * data.results
           */
          // console.log("success search", id, name);

          const dummyString = "//////" + id + "/";
          let pokemon = {
            name: name,
            url: dummyString,
          };

          const fetchOnePokemon = fetchPokemonDataPromise(pokemon, 0);
          fetchOnePokemon.then((data) => {
            // console.log("fetch result data: ", data);

            const dummyArray = [data];

            // console.log("Pokemon List Collections: ", dummyArray);
            commit("setPokemonList", dummyArray);

            commit("setLoading", false);
            commit("setHasNoData", false);
            router.push("/pokemon/" + pokemon.name);
          });

          // console.log("fetchResult", fetchOnePokemon);
        } else {
          throw new Error("Failed to fetch the data from server");
        }
      } catch (err) {
        console.error(err);
        // console.log("catch block error");
        commit("setLoading", false);
        commit("setHasNoData", true);
        router.push("/NotFound");
        return; //== need to return to AVOID executing the commits below
      }

      // const fetchPokemon = fetchPokemonDataPromise()
    },
  },
  getters: {
    isLoadingData: (state) => state.isLoadingData,
    hasNoData: (state) => state.hasNoData,
    totalCount: (state) => state.totalCount,
    nextPage: (state) => state.nextPage,
    prevPage: (state) => state.prevPage,
    pokemonList: (state) => state.pokemonList,
    pageOffset: (state) => state.pageOffset,
    currentPokemonIndex: (state) => state.currentStoreIndex,
  },

  modules: {},
});

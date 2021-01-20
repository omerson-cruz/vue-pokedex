import Vue from "vue";
import Vuex from "vuex";
import globalAxios from "axios";
import { pokemonApi } from "../plugins/axios";
import {
  getPokemonIdFromUrl,
  getSpeciesIdFromUrl,
  getTypeIdFromUrl,
  getEvolutionIdFromUrl,
  buildEvolutionChain,
} from "../utilities/utilities";

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
        return new Promise((resolve) => {
          const pokeData = {
            id: null,
            store_id: index,
            species_id: null, // for evolution details and ABOUT
            // type_id: null, // for strengths and weaknesses
            evolution_id: null,
            name: "",
            // GET path: /pokemon/:id
            imageUrl: "",
            height: 0,
            weight: 0,
            abilities: [],
            moves: [],
            types: [],
            stats: {},
            // ABOUT DETAILS - GET path: /pokemon
            about: [],
            // Strengths and Weaknesses GET path: /d
            strengths: {
              double_damage_to: [],
              half_damage_from: [],
              no_damage_from: [],
            },
            weaknesses: {
              double_damage_from: [],
              half_damage_to: [],
              no_damage_to: [],
            },
            evolution_chain: [],
          };
          pokeData.name = pokemon.name;
          pokeData.id = getPokemonIdFromUrl(pokemon.url);
          resolve(pokeData);
        }).then((pokeData) => {
          globalAxios
            .get("/pokemon/" + pokeData.id)
            .then(({ data }) => {
              // console.log("new Data: ", data);
              // ADD new Data

              const abilities = data.abilities.map(
                (ability) => ability.ability.name
              );
              const moves = data.moves.map((move) => move.move.name);
              const types = data.types.map((type) => ({
                name: type.type.name,
                typeId: getTypeIdFromUrl(type.type.url),
              }));
              const stats = {};
              data.stats.forEach((stat) => {
                stats[stat.stat.name] = stat.base_stat;
              });

              pokeData.imageUrl =
                data.sprites.other["official-artwork"].front_default;
              pokeData.height = data.height;
              pokeData.weight = data.weight;

              pokeData.types = types;
              pokeData.stats = stats;
              pokeData.abilities = abilities;
              pokeData.moves = moves;
              pokeData.species_id = getSpeciesIdFromUrl(data.species.url);

              return pokeData;
            })
            .then((pokeData) => {
              // SPECIES DETAILS
              globalAxios
                .get("/pokemon-species/" + pokeData.species_id)
                .then(({ data }) => {
                  // console.log("Species Data:", data);
                  // const about = data.flavor_text_entries
                  //   .filter((text_entry, index) => {
                  //     if (index < 10) return true;
                  //   })
                  //   .map((text_entry) => text_entry.flavor_text);
                  let about = [];
                  const aboutLimit = 20;

                  for (let i = 0; i < aboutLimit; i++) {
                    about = [...about, data.flavor_text_entries[i].flavor_text];
                  }

                  pokeData.about = about;
                  pokeData.evolution_id = getEvolutionIdFromUrl(
                    data.evolution_chain.url
                  );

                  return pokeData;
                })
                .then((data) => {
                  // EXTRACT EVOLUTION CHAIN DETAILS
                  // console.log(
                  //   "pokeData after species extraction: ",
                  //   data.evolution_id
                  // );
                  globalAxios
                    .get("/evolution-chain/" + data.evolution_id)
                    .then(({ data: { chain } }) => {
                      // console.log("evolution", chain);
                      pokeData.evolution_chain = buildEvolutionChain(chain);
                    });
                });

              /**
               * Strengths and Weaknesses GET path: /
               * strengths: {
               *   double_damage_to: "",
               *   half_damage_from: "",
               *   no_damage_from: "",
               * },
               * weaknesses: {
               *   double_damage_from: "",
               *   half_damage_to: "",
               *   no_damage_to: "",
               * },
               */

              pokeData.types.forEach(({ typeId }) => {
                globalAxios
                  .get("/type/" + typeId)
                  .then(({ data: { damage_relations } }) => {
                    // console.log("TYPE data");
                    // console.log(damage_relations);

                    // MERGING ARRAYS OF damage_relations
                    // INTO EXISTING ARRAYS of PokeData

                    // TYPE STRENGTHS
                    pokeData.strengths.double_damage_to = [
                      ...pokeData.strengths.double_damage_to,
                      ...damage_relations.double_damage_to,
                    ];
                    pokeData.strengths.half_damage_from = [
                      ...pokeData.strengths.half_damage_from,
                      ...damage_relations.half_damage_from,
                    ];
                    pokeData.strengths.no_damage_from = [
                      ...pokeData.strengths.no_damage_from,
                      ...damage_relations.no_damage_from,
                    ];
                    // TYPE WEAKNESSES...
                    pokeData.weaknesses.double_damage_from = [
                      ...pokeData.weaknesses.double_damage_from,
                      ...damage_relations.double_damage_from,
                    ];
                    pokeData.weaknesses.half_damage_to = [
                      ...pokeData.weaknesses.half_damage_to,
                      ...damage_relations.half_damage_to,
                    ];
                    pokeData.weaknesses.no_damage_to = [
                      ...pokeData.weaknesses.no_damage_to,
                      ...damage_relations.no_damage_to,
                    ];
                  });
              });
            })

            .catch((err) => {
              console.error(err);
            });
          return pokeData;
        });
      });

      Promise.all(promiseArray).then((values) => {
        console.log("promise all: ", values);
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

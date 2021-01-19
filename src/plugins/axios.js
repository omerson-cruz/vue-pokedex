import axios from "axios";

axios.defaults.baseURL = "https://pokeapi.co/api/v2/";

export const pokemonApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});

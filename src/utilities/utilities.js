export const getPokemonIdFromUrl = (inputUrl) => {
  let inputUrlArr = inputUrl.split("/");

  // 2DO: hardcoded for now Pokemon ID on index 6
  return +inputUrlArr[6];
};

export const getSpeciesIdFromUrl = (inputUrl) => {
  let inputUrlArr = inputUrl.split("/");

  return +inputUrlArr[6];
};

export const getTypeIdFromUrl = (inputUrl) => {
  let inputUrlArr = inputUrl.split("/");

  return +inputUrlArr[6];
};

export const getEvolutionIdFromUrl = (inputUrl) => {
  let inputUrlArr = inputUrl.split("/");

  return +inputUrlArr[6];
};

export const buildEvolutionChain = (chain) => {
  console.log("chain", chain);
};

export const computeOffsetPage = (inputPageNumber, pageSize) => {
  const offsetPage = (inputPageNumber - 1) * pageSize;

  return offsetPage;
};

export const getPokemonIdFromUrl = (inputUrl) => {
  let inputUrlArr = inputUrl.split("/");

  // 2DO: hardcoded for now Entity ID on index 6
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

export const computeOffsetPage = (inputPageNumber, pageSize) => {
  const offsetPage = (inputPageNumber - 1) * pageSize;

  return offsetPage;
};

const getEvolutionNames = (outputChain, inputChain) => {
  // console.log("inputChain: ", inputChain);
  outputChain.push(inputChain.species.name);
  if (inputChain.evolves_to.length > 0) {
    inputChain.evolves_to.forEach((evolveDetail) => {
      // console.log("evolve Detail: ", evolveDetail.evolves_to);
      getEvolutionNames(outputChain, evolveDetail);
    });
  }
};

export const buildEvolutionChain = (chain) => {
  // console.log("chain", chain);

  const evolutionChain = [];
  getEvolutionNames(evolutionChain, chain);

  // console.log("outputChain: ", evolutionChain);

  return evolutionChain;
};

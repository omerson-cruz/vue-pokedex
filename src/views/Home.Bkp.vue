<template>
    <div class="columns">
        <div class="column is-10 is-offset-1 column-container">
            <div class="container list-container">
                <poke-list></poke-list>
            </div>
        </div>
    </div>
</template>

<script>
import Pokelist from "../components/PokeList"

export default {
    name: "Home",
    components: {
        pokeList: Pokelist
    }
}
</script>

<style scoped>
.column-container {
    min-height: 100vh;
    background: radial-gradient(
      rgba(219, 190, 190, 0.562),
      rgba(255, 255, 255, 0.884)
    );
  background-blend-mode: multiply;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.list-container {
    width: 85%;
    margin-top: -3px;
    min-height: 100vh;
    background-color: whitesmoke;
    border: 2px solid rgba(187, 182, 182, 0.719)
}

</style>,
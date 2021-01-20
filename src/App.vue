<template>
  <div>
    <nav-bar></nav-bar>
    <div class="main-container">
      <div class="columns">
        <div class="column is-10 is-offset-1 column-container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/Navbar"


// testing axios
import axios from 'axios'

export default {
  name: 'App',

  components: {
    navBar: NavBar,

  },

  computed: {

  },

  async created() {
    console.log('app created: ', this.$store.getters.isLoadingData)
    console.log(`
      set isLoadingData to TRUE
      GET pokemon count
        -> set the number of pages in the pagination
        -> get each pokemons ORDER number
    `)

    try {
      this.$store.dispatch('loadPokemonList', true)
    } catch(err) {
      console.error("error: ", err)
    }
  }
}
</script>

<style lang="scss">
@import "./assets/scss/main.scss";


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
  background-attachment: fixed;
}

.list-container {
    width: 85%;
    margin-top: -3px;
    min-height: 100vh;
    background-color: whitesmoke;
    border: 2px solid rgba(187, 182, 182, 0.719)
}

</style>

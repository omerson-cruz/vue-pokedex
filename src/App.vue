<template>
  <div>
    <nav-bar></nav-bar>
    <div class="main-container">
      <router-view></router-view>
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
@import "./assets/scss/main.scss"

</style>

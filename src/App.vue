<template>
  <div>
    <nav-bar></nav-bar>
    <div class="main-container">
      <home></home>
    </div>


  </div>
</template>

<script>
import NavBar from "./components/Navbar"
import Home from "./views/Home"

export default {
  name: 'App',

  components: {
    navBar: NavBar,
    home: Home
  },
}
</script>

<style lang="scss">
@import "./assets/scss/main.scss"

</style>

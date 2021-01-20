<template>
    <div class="container list-container">
        <poke-list :page="page"></poke-list>
    </div>
</template>

<script>
import Pokelist from "../components/PokeList"

export default {
    name: "Home",

    data() {
        return {
            page: 1
        }
    },

    components: {
        pokeList: Pokelist
    }
}
</script>

<style scoped>


</style>,
<template>
    <div class="container list-container">
        <poke-list></poke-list>
    </div>
</template>

<script>
import Pokelist from "../components/PokeList"

export default {
    name: "Home",

    data() {
        return {
            page: 1,
        }
    },

    components: {
        pokeList: Pokelist
    },

    created(){
        console.log(this.$route.path)
        // if (this.$route.path) return
    }
}
</script>

<style scoped>


</style>,
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
            page: 1,
        }
    },

    components: {
        pokeList: Pokelist
    },

    created(){
        console.log(this.$route.path)
        if (this.$route.path === "/") {
            this.page = 1
        } else {
            console.log("this.route.path: ", this.$route)
            this.page = +this.$route.params.id
        }
    },

    updated() {
        console.log("Home Updated: ", this.$route)
        this.page = +this.$route.params.id
    },

    watch: {
        '$route'(to, from) {
            console.log("watching from Home to: ", to)
            console.log("watching from:Home from ", from)
            if (to.path != from.path){
                // this.$store.dispatch('loadPokemonList')
            }
        }
    }
}
</script>

<style scoped>


</style>,
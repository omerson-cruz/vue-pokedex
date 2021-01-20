<template>
    <div class="container list-container">
        <div class="columns">
            <div class="column is-12">
                <div class="container  mt-5 mx-0">
                    <div class="block">
                    <!-- <b-icon
                        @click="goToPreviousPage"
                        icon="arrow-circle-left"
                        size="is-large"
                    >
                    </b-icon> -->
                    <div class="tile is-dark">
                    <article class="tile is-child notification is-greywhite">
                        <b-button icon-right="arrow-left" size="is-large"                         @click="goToPreviousPage"></b-button>
                    </article>

                    </div>


                    </div>
                </div>
            </div>
            <!-- Body -->
            <!-- <div class="column is-6-desktop is-12-touch">

            </div>
            <div class="column is-6-desktop is-12-touch">

            </div> -->

        </div>
        <!-- TILES -->
            <div class="tile is-ancestor">
                <div class="tile is-vertical is-8">
                    <div class="tile">
                    <div class="tile is-parent is-vertical">
                        <article class="tile is-child notification is-primary">
                        <p class="title">Types</p>
                        <div class="content">
                            <b-taglist>
                                <b-tag
                                class="is-medium"
                                :type="colors[index]"
                                v-for="(type, index) in pokemon.types"
                                :key="type.typeId"
                                >
                                    {{type.name}}
                                </b-tag>
                            </b-taglist>
                            <p class="subtitle">Height: {{pokemon.height}}" <span class="ml-5">Weight: {{pokemon.weight}}</span> </p>

                        </div>
                        </article>
                        <article class="tile is-child notification is-warning">
                            <div class="columns">
                                <div class="column is-6">
                                    <p class="title mb-1">Stats</p>
                                    <p  v-for="(stat,index) in pokemon.stats" :key="index">
                                        {{index}} : <span class="ml-1 has-text-weight-semibold">{{ stat }}</span>
                                    </p>
                                </div>
                                <div class="column is-6">
                                    <p class="title mb-1">Abilities</p>
                                    <p  v-for="(ability,index) in pokemon.abilities" :key="index">
                                        {{ability}}
                                    </p>
                                </div>
                            </div>

                        </article>
                        <article class="tile is-child notification is-success">
                        <p class="title">Evolution Chain</p>
                        <p class="subtitle" >
                            <span v-for="(evolution, index) in pokemon.evolution_chain" :key="index">
                                <b-icon icon="arrow-alt-circle-right"></b-icon> <span class="mr-2">{{evolution}}</span>
                            </span>
                        </p>
                        </article>
                    </div>
                    <div class="tile is-parent">
                        <article class="tile is-child is-info-passive ">
                        <p class="title is-1 has-text-info">{{pokemon.name}}</p>
                        <p class="subtitle has-text-grey">{{pokemon.id | formatId }}</p>
                        <figure class="image is-4by4">
                            <img :src="pokemon.imageUrl">
                        </figure>
                        </article>
                    </div>
                    </div>
                    <div class="tile is-parent">
                    <article class="tile is-child notification is-danger">
                        <p class="title">Other Details</p>
                        <div class="columns">
                            <div class="column is-6">
                                <p class="mb-2">
                                  <span class="subtitle is-3">Strengths</span>
                                </p>
                                <div class="columns ">
                                    <div class="column is-4">
                                        <span class="is-5">Double Damage to</span>
                                        <ul>
                                            <li v-for="(entry, index) in pokemon.strengths.double_damage_to" :key="index">
                                                {{entry.name}}
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="column is-4">
                                        <span class="is-5">Half Damage From</span>
                                        <ul>
                                            <li v-for="(entry, index) in pokemon.strengths.half_damage_from" :key="index">
                                                {{entry.name}}
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="column is-4">
                                        <span class="is-5">No Damage From</span>
                                        <ul>
                                            <li v-for="(entry, index) in pokemon.strengths.no_damage_from" :key="index">
                                                {{entry.name}}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-6">
                                <p class="mb-2">
                                  <span class="subtitle is-3 title">Weaknesses</span>
                                </p>
                                <div class="columns ">
                                    <div class="column is-4">
                                        <span class="is-5">Double Damage From</span>
                                        <ul>
                                            <li v-for="(entry, index) in pokemon.weaknesses.double_damage_from" :key="index">
                                                {{entry.name}}
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="column is-4">
                                        <span class="is-5">Half Damage To</span>
                                        <ul>
                                            <li v-for="(entry, index) in pokemon.weaknesses.half_damage_to" :key="index">
                                                {{entry.name}}
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="column is-4">
                                        <span class="is-5">No Damage To</span>
                                        <ul>
                                            <li v-for="(entry, index) in pokemon.weaknesses.no_damage_to" :key="index">
                                                {{entry.name}}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <!-- MOVEMENTS -->
                        </div>
                            <div class="column">
                                <p class="title is-4 mb-4 is-2">Movements</p>
                                <b-taglist>
                                    <b-tag class="is-small" :type="'is-light'" v-for="(movement, index) in pokemon.moves" :key="index">{{movement}}</b-tag>
                                </b-taglist>
                            </div>
                    </article>
                    </div>
                </div>
                <div class="tile is-parent">
                    <article class="tile is-child notification is-success">
                    <div class="content">
                        <p class="title is-3">About</p>
                        <p class="is-11">
                            <span v-for="(about, index) in pokemon.about" :key="index">
                                {{about}}
                            </span>
                        </p>
                    </div>
                    </article>
                </div>
                </div>
            <!-- END - TILES  -->
    </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {

    computed: {
            ...mapGetters({
            pokemonList: "pokemonList",
            pokemonIndex: "currentPokemonIndex",
        }),
        pokemon(){
            // console.log('this pokemon index', this.pokemonIndex)
            // console.log('this pokemon list', this.pokemonList)
            // console.log('this pokemon list', this.pokemonList[this.pokemonIndex])

            return this.pokemonList[this.pokemonIndex]
        }
    },

    data() {
        return {
            colors: [
                'is-success',
                'is-warning'
            ]
        }
    },

    methods: {
        goToPreviousPage(){
            // console.log('clicked')
            this.$router.go(-1)
        }
    },

    created() {
        // console.log('pokemon page created')

    },

    filters: {
        formatId(value) {
            // console.log(value)
            // Pad with Zero characters
            let val = '0'.repeat( Math.max(5 - value.toString().length, 0)) + value
            // console.log('#'+val)
            return  "#" + val
        }
    },

}
</script>

<style scoped>

</style>,
<template>
    <section class="columns px-5 py-5 is-flex-wrap-wrap">
        <div class="column is-3-desktop is-12-mobile"
            v-for="(pokemon) in pokemonList" :key="pokemon.id"
        >
            <div class="card">
                <div class="card-image py-3 has-background-greywhite"
                    @click="handleImageClick"
                >
                    <figure class="media is-justify-content-center"> <!-- .media is a flex -->
                        <p class="image is-150x150"> <!-- Both size of this and size of skeleton below should match -->
                            <!-- <img :src="pokemon.imageUrl" alt="Pokemon image"

                                style="width: 200px"
                            > -->
                            <b-image
                                :src="pokemon.imageUrl"
                                :src-fallback="'https://toppng.com/uploads/preview/pokeball-11530983183h69cddzgqu.png'"
                            ></b-image>
                        </p>
                    </figure>
                </div>
            <!--  INFO SUMMARY -->
               <div class="card-content pt-0 ">
                   <div class="content mt-1 has-text-info is-size-4">
                       <span>{{pokemon.id | formatId}}</span>
                   </div>

                    <div class="is-size-3 has-text-weight-semibold has-text-info-dark mb-4">
                        {{pokemon.name}}
                    </div>
                    <div class="content">
                        <b-taglist>
                            <b-tag class="is-medium" :type="colors[index]" v-for="(type, index) in pokemon.types" :key="type.typeId">{{type.name}}</b-tag>
                        </b-taglist>
                    </div>
               </div>
            </div>
        </div>
    </section>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    name: 'PokeListItems',

    data() {
        return {
            colors: [
                'is-primary',
                'is-success',
                'is-warning'
            ]
        }
    },
    computed: {
        ...mapGetters({
            pokemonList: "pokemonList"
        })
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

    methods: {
        handleImageClick() {
            console.log("image was clicked")
        }
    },

    watch: {
        pokemonList(value){
            console.log('pokemon List changed: ', value)
        }
    }

}
</script>

<style scoped>

</style>,
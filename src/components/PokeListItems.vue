<template>
    <section class="columns px-5 py-5 is-flex-wrap-wrap">
        <div class="column is-3-desktop is-12-mobile"
            v-for="(card, index) in cards" :key="index"
        >
            <div class="card">
                <div class="card-image py-3 has-background-greywhite"
                    @click="handleImageClick"
                >
                    <figure class="media is-justify-content-center"> <!-- .media is a flex -->
                        <p class="image is-150x150"> <!-- Both size of this and size of skeleton below should match -->
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" alt="Placeholder image"

                            style="width: 200px"
                            >
                        </p>
                    </figure>
                </div>
            <!--  INFO SUMMARY -->
               <div class="card-content pt-0 ">
                   <div class="content mt-1 has-text-info">
                       <span>#0001</span>
                   </div>

                    <div class="is-size-3 has-text-weight-semibold has-text-info-dark">
                        Bulbasaur
                    </div>
                    <!-- <div class="content">
                        <b-taglist>
                            <b-tag type="is-info">Halaman</b-tag>
                            <b-tag type="is-success">Puno</b-tag>
                        </b-taglist>
                    </div> -->
               </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'PokeListItems',

    data() {
        return {
            cards: 20,
        }
    },

    methods: {
        handleImageClick() {
            console.log("image was clicked")
        }
    }
}
</script>

<style scoped>

</style>,
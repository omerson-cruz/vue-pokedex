<template>
    <div>
    <!-- LOADING SKELETON LIST -->
        <skeleton-list></skeleton-list>
    <!-- END - SKELETON LIST -->


    <!-- ACTUAL POKE-LIST ITEMS -->



    <!-- END - ACTUAL POKE-LIST ITEMS -->


    <!-- PAGINATION -->


    <!-- PAGINATION -->
        <section class="has-text-weight-medium">
            <v-pagination
                v-model="page"
                :length="length"
                prev-icon="fa-arrow-alt-circle-left"
                next-icon="fa-arrow-alt-circle-right"

            >

            </v-pagination>

        </section>
        <!-- <section>

        </section> -->
    </div>
</template>

<script>
import SkeletonList from "../components/PokeListSkeleton"
import {VPagination} from "vuetify/lib"

export default {
    components: {
        skeletonList: SkeletonList,
        vPagination: VPagination
    },

    data() {
        return {
            length: 55,
            page: 1
        }
    },

    watch: {
        page(value) {
            console.log("current page: ", this.page)
        }
    }
}
</script>

<style lang="scss" scoped>


</style>,
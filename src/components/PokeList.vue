<template>
    <div>
    <!-- LOADING SKELETON LIST -->
        <skeleton-list></skeleton-list>

    <!-- END - SKELETON LIST -->


    <!-- ACTUAL POKE-LIST ITEMS -->



    <!-- END - ACTUAL POKE-LIST ITEMS -->


    <!-- PAGINATION -->
        <!-- <section>

            <div class="columns is-justify-content-center mb-2">
                <div class="column">

                </div>
                <div class="column is-7">
                <b-pagination
                :total="total"
                v-model="current"
                :range-before="rangeBefore"
                :range-after="rangeAfter"
                :order="order"
                :size="size"
                :simple="isSimple"
                :rounded="isRounded"
                :per-page="perPage"
                :icon-prev="prevIcon"
                :icon-next="nextIcon"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page">
            </b-pagination>
                </div>
            </div>

        </section> -->

    <!-- PAGINATION -->
        <section>
            <pagination>

            </pagination>

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
        pagination: VPagination
    },

    data() {
        return {

        }
    },
}
</script>

<style lang="scss" scoped>


</style>,
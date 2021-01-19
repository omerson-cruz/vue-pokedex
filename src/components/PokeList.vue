<template>
    <div>
    <!-- LOADING SKELETON LIST -->
        <template v-if="isLoading">
            <skeleton-list></skeleton-list>
        </template>
    <!-- END - SKELETON LIST -->

    <!-- ACTUAL POKE-LIST ITEMS -->
        <template v-else>
            <template v-if="hasNoData">
                <not-found></not-found>
            </template>

            <template v-else>
                <poke-list-items></poke-list-items>
            </template>
        </template>


    <!-- END - ACTUAL POKE-LIST ITEMS -->


    <!-- PAGINATION -->


    <!-- PAGINATION -->
        <section class="has-text-weight-bold columns mb-4 hastextli">
            <div class="column is-6-tablet is-offset-3-tablet  is-12-mobile"
                v-if="!hasNoData"
            >
                <paginate
                    :pageCount="pageCount"
                    :force-page="page"
                    :containerClass="'pagination is-centered is-rounded'"
                    :clickHandler="clickPage"
                    :page-class="'pagination-link'"
                    :page-link-class="'page-text'"
                    :prev-link-class="'pagination-previous'"
                    :next-link-class="'pagination-next'"
                    :active-class="'active-page'"
                    :active-link-class="'has-text-light'"
                >
                </paginate>
            </div>
        </section>
        <!-- <section>

        </section> -->
    </div>
</template>

<script>
import SkeletonList from "../components/PokeListSkeleton"
import PokeListItems from "../components/PokeListItems"
import Pagination from "vuejs-paginate"
import PokeNotFound from "../components/PokeNotFound"

import { mapGetters } from "vuex"

export default {
    components: {
        skeletonList: SkeletonList,
        pokeListItems: PokeListItems,
        paginate: Pagination,
        notFound: PokeNotFound
    },

    data() {
        return {
            pageCount: 55,
            page: 1,
        }
    },

    methods: {
        clickPage(pageNum) {
            this.page = pageNum
        }
    },

    computed: {
        ...mapGetters({
            isLoading : 'isLoadingData',
            hasNoData: 'hasNoData'
        })
    },

    watch: {
        page(value) {
            console.log("current page: ", this.page)
        }
    }
}
</script>

<style lang="scss" scoped>
.error-container {
    min-height: 80vh;
}

</style>,
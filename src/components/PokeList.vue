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

import { computeOffsetPage } from "../utilities/utilities"

export default {
    components: {
        skeletonList: SkeletonList,
        pokeListItems: PokeListItems,
        paginate: Pagination,
        notFound: PokeNotFound
    },

    data() {
        return {
            pageSize: 20,
            page: 1,
        }
    },

    methods: {
        computeOffsetPage,

        clickPage(pageNum) {
            console.log('pageNum: ', pageNum)
            const offset = this.computeOffsetPage(pageNum, this.pageSize)
            console.log('offset: ', offset)
            console.log('limit: ', this.pageSize)
        }

    },

    computed: {
        ...mapGetters({
            isLoading : 'isLoadingData',
            hasNoData: 'hasNoData',
            nextPage: 'nextPage',
            prevPage: 'prevPage',
        }),
        pageCount() {  // DO not to use ARROW function in computed or you will not be able to use "this" keyword
            const TotalNoOfPages = Math.ceil(this.$store.getters.totalCount / this.pageSize)
            console.log('total pages: ', TotalNoOfPages)

            return TotalNoOfPages
        }
    },

    watch: {
        page(value) {
            console.log("current page: ", this.page)
        },
        prevPage() {
            console.log("prevPage changed: ", this.prevPage)
        },
        nextPage() {
            console.log("nextPage changed: ", this.nextPage)
        }
    }
}
</script>

<style lang="scss" scoped>
.error-container {
    min-height: 80vh;
}

</style>,
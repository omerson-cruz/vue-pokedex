<template>
    <div>
    <!-- LOADING SKELETON LIST -->
        <template v-if="isLoading">
            <transition name="fade" mode="out-in">
                <skeleton-list></skeleton-list>
            </transition>
        </template>
    <!-- END - SKELETON LIST -->

    <!-- ACTUAL POKE-LIST ITEMS -->
        <template v-else>
            <template v-if="hasNoData">
                <not-found></not-found>
            </template>

            <template v-else>
                <transition name="fade" mode="out-in">
                    <poke-list-items></poke-list-items>
                </transition>

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

    props: {
        page: {
            default: 1,
            type: Number
        }
    },

    data() {
        return {
            pageSize: 20,
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

    /* For FADE we are using the "TRANSITION" Property to do animation */

    .fade-enter {
        /* here we will set our inital state */
        opacity: 0
    }
    .fade-enter-active {
        /* here is where we setup the real transition */
        transition: opacity .7s;
    }
    .fade-leave {
        /* opacity: 1  <-- since it is the default state so no need to put opacity: 1 */
    }
    .fade-leave-active {
        transition: opacity .5s;
        opacity: 0;
    }


</style>,
<template>
    <div>
        <!-- PAGE -->

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
                    :force-page="currentPage"
                    :initial-page="page"
                >
                </paginate>
            </div>
        </section>
        <div>
            current Page number: {{ currentPage }}
        </div>

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
            type: Number
        }
    },

    data() {
        return {
            currentPage: this.page,
            pageSize: 20,
        }
    },

    created() {
        console.log('pokelist created')
    },

    updated() {
        console.log('pokelist Updated')

        if(this.$route.params.id) { // if :id exists. Dont just use "this.$route.params" for checking becaause it will always be true because $route.params is always an empty object
            // console.log(this.$route)
            this.currentPage = +this.$route.params.id
        }

    },

    methods: {
        computeOffsetPage,

        clickPage(pageNum) {
            console.log('pageNum: ', pageNum)
            this.currentPage = pageNum  // ==> should not modify prop from child
            const offset = this.computeOffsetPage(pageNum, this.pageSize)
            console.log('offset: ', offset)
            console.log('limit: ', this.pageSize)
            this.$router.push(`/page/${pageNum}`)
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
        },
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
        },
        //==> this will ensure that this.currentPage will be updated every time we click the pagination
        // or when we change route
        // ==> There is a caveat tho because if we try to refresh the page and stays on the same URL route
        // then the this.currentPage will go back to value = "1" so will not be in-sync

        // == In order to update this.currentPage when refreshed then we need to use "update()" method
        '$route'(to, from) {
            console.log("to: ", to)
            console.log("from: ", from)
            if(to.params.id)
                this.currentPage = +to.params.id
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
        transition: opacity .3s;
    }
    .fade-leave {
        /* opacity: 1  <-- since it is the default state so no need to put opacity: 1 */
    }
    .fade-leave-active {
        transition: opacity .65s;
        opacity: 1; // <-- have to set to 1 so that skeleton will be displayed longer
    }


</style>,
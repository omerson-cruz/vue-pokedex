<template>
    <section class="columns px-5 py-5 is-flex-wrap-wrap">
        <div class="column is-3-desktop is-12-mobile"
            v-for="(card, index) in cards" :key="index"
        >
            <div class="card">
                <div class="card-image py-3">
                    <figure class="media is-justify-content-center"> <!-- .media is a flex -->
                        <p class="image is-150x150"> <!-- Both size of this and size of skeleton below should match -->
                            <b-skeleton circle width="150px" height="150px"></b-skeleton>
                        </p>
                    </figure>
                </div>
               <div class="card-content pt-0 ">
                    <div class="content">
                    <p>
                        <b-skeleton active></b-skeleton>
                        <b-skeleton active width="100px"></b-skeleton>
                        <b-skeleton height="30px"></b-skeleton>
                    </p>
                    <nav class="level is-mobile">
                    <div class="level-left">
                        <a class="level-item">
                            <span class="icon is-small">
                                <b-skeleton></b-skeleton>
                            </span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small">
                                <b-skeleton></b-skeleton>
                            </span>
                        </a>
                    </div>
                </nav>
                </div>
               </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            cards: 20,
            isLoading: true
        }
    },
}
</script>

<style scoped>

</style>,
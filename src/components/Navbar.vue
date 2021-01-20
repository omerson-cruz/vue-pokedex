<template>
  <div id="app">
    <!-- NAVBAR -->
    <b-navbar class="is-red navbar-test">
        <template #brand >
            <b-navbar-item
                tag="router-link"
                :to="{ path: '/' }"
                class="ml-5"
            >
                <img
                    src="https://pngimg.com/uploads/pokeball/pokeball_PNG8.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                />
                <span class="mx-2 has-text-weight-bold has-text-warning">POKEDEX</span>
            </b-navbar-item>
        </template>
        <!-- NAV-START -->
        <template #start>
            <b-navbar-item >
                <router-link
                    to="/about"
                    tag="a"
                    exact
                    class="router-link"
                >
                   About
                </router-link>
            </b-navbar-item>


            <b-navbar-item class="search-container is-12" tag="div">
                <b-input
                    placeholder="Search Pokemon..."
                    type="search"
                    icon="search"
                    icon-clickable
                    @icon-click="searchIconClick"
                    icon-right="close-circle"
                    icon-right-clickable
                    @icon-right-click="clearIconClick"
                    v-model="searchTerm"
                    @keyup.native="handleKeyUp"

                    >
                </b-input>
            </b-navbar-item>
        </template>
        <!-- End -NAVBAR-START -->

        <!-- <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-grey">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                        Log in
                    </a>
                </div>
            </b-navbar-item>
        </template> -->

        <!-- ROUND CIRCLE DESIGN  -->
        <template #end>
            <b-navbar-item tag="div" class="is-hidden-touch mx-6">
                <div class="columns is-flex-direction-row">
                    <div class="column is-flex circle-container">
                        <div class="outer-circles"></div>
                        <div class="inner-circles has-background-warning"></div>
                    </div>
                    <div class="column is-flex circle-container">
                        <div class="outer-circles"></div>
                        <div class="inner-circles has-background-primary"></div>
                    </div>
                    <div class="column is-flex circle-container">
                        <div class="outer-circles"></div>
                        <div class="inner-circles has-background-success"></div>
                    </div>

                    <!-- <div class="circles">testing</div>
                    <div class="circles">testing</div> -->
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
    <!-- NAVBAR-END -->
  </div>
</template>
<script>



export default {
    name: 'Navbar',

    data() {
        return {
            searchTerm: '',
        }
    },
    methods: {
        dispatchSearchPokemon() {
            const payload = this.searchTerm
            this.searchTerm = ""
            this.$store.dispatch('searchPokemon', payload)
        },
        searchIconClick() {
            this.dispatchSearchPokemon()
        },
        enterKeyHandler(){

        },
        clearIconClick() {
            this.searchTerm = ""
        },
        handleKeyUp(event) {
            // Check if ENTER key pressed
            if (event.keyCode === 13) {
                this.dispatchSearchPokemon()
            }
        }

    }


}
</script>

<style lang="scss">
@media only screen  and (min-width: 1000px){
    .navbar-test {
        height: 70px;
    }

    .router-link {
        color: #383838;
    }
}

.outer-circles {
    width: 50px;
    height: 50px;
    background: white;
    border-radius: 50%
}

.inner-circles {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.circle-container {
    position: relative;
}


</style>
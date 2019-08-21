<template>
    <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
                </a>

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <router-link to="/" class="navbar-item">Home</router-link>
                    <router-link to="/about" class="navbar-item">About</router-link>
                    <router-link class="navbar-item"
                        to="/todo"
                        v-if="$store.getters.loggedIn">
                        App
                    </router-link>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <router-link class="button is-primary"
                                to="/register"
                                v-if="!$store.getters.loggedIn">
                                Sign up
                            </router-link>
                            <router-link class="button is-light"
                                to="/login"
                                v-if="!$store.getters.loggedIn">
                                Log in
                            </router-link>
                            <router-link
                                to="/logout"
                                v-if="$store.getters.loggedIn">
                                Logout
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <section class="section">
            <div class="columns is-centered">
                <div class="column is-two-thirds-tablet is-half-widescreen">
                    <router-view></router-view>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'Master',
        created() {
            let token = localStorage.getItem('access_token') || null
            this.$store.commit('updateToken', token)
        }
    }
</script>

<style scoped>

</style>

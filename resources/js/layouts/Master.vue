<template>
    <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" to="/">
                    Tasks
                </a>

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
                    @click="toggleDropdown">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div class="navbar-menu" :class="{ 'is-active': showDropdown }">
                <div class="navbar-start">
                    <router-link class="navbar-item"
                        to="/"
                        v-on:click.native="toggleDropdown">
                        Home
                    </router-link>
                    <router-link class="navbar-item"
                        to="/about"
                        v-on:click.native="toggleDropdown">
                        About
                    </router-link>
                    <router-link class="navbar-item"
                        to="/todo"
                        v-if="$store.getters.loggedIn"
                        v-on:click.native="toggleDropdown">
                        App
                    </router-link>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <router-link class="button is-primary"
                                to="/register"
                                v-if="!$store.getters.loggedIn"
                                v-on:click.native="toggleDropdown">
                                Sign up
                            </router-link>
                            <router-link class="button is-light"
                                to="/login"
                                v-if="!$store.getters.loggedIn"
                                v-on:click.native="toggleDropdown">
                                Log in
                            </router-link>
                            <router-link
                                to="/logout"
                                v-if="$store.getters.loggedIn"
                                v-on:click.native="toggleDropdown">
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
        data() {
            return {
                showDropdown: false
            }
        },
        created() {
            let token = localStorage.getItem('access_token') || null
            this.$store.commit('updateToken', token)
        },
        methods: {
            toggleDropdown() {
                this.showDropdown = !this.showDropdown
            }
        }
    }
</script>

<style scoped>

</style>

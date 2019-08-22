<template>
    <section class="hero">
        <div class="hero-head">
            <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
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
                            </div>
                        </div>
                        <router-link class="navbar-item"
                            to="/logout"
                            v-if="$store.getters.loggedIn"
                            v-on:click.native="toggleDropdown">
                            Logout
                        </router-link>
                    </div>
                </div>
            </nav>
        </div>
        <router-view></router-view>
    </section>
</template>

<script>
    export default {
        name: 'Master',
        data() {
            return {
                showDropdown: false
            }
        },
        methods: {
            toggleDropdown() {
                this.showDropdown = !this.showDropdown
            }
        }
    }
</script>

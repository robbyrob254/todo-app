<template>
    <section class="hero">
        <div class="hero-head">
            <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <div class="navbar-item">
                        <div class="buttons">
                            <router-link class="button is-link is-outlined"
                                to="/register"
                                v-if="!$store.getters.loggedIn"
                                v-on:click.native="toggleDropdown">
                                Sign up
                            </router-link>
                            <router-link class="button is-dark is-outlined"
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

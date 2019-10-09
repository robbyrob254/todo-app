<template>
    <section class="section">
        <div class="container">
            <nav class="level is-mobile">
                <div class="level-left">
                    <p class="level-item">
                        <router-link
                            to="/"
                            v-on:click.native="toggleDropdown">
                            Home
                        </router-link>
                    </p>
                    <p class="level-item">
                        <router-link
                            to="/tasks"
                            v-if="$store.getters.loggedIn"
                            v-on:click.native="toggleDropdown">
                            Todos
                        </router-link>
                    </p>
                </div>

                <div class="level-right">
                    <p class="level-item">
                        <router-link class="button is-link is-outlined"
                            to="/register"
                            v-if="!$store.getters.loggedIn"
                            v-on:click.native="toggleDropdown">
                            Sign up
                        </router-link>
                    </p>
                    <p class="level-item">
                        <router-link class="button is-dark is-outlined"
                            to="/login"
                            v-if="!$store.getters.loggedIn"
                            v-on:click.native="toggleDropdown">
                            Log in
                        </router-link>
                    </p>
                    <p class="level-item">
                        <router-link class="navbar-item"
                            to="/logout"
                            v-if="$store.getters.loggedIn"
                            v-on:click.native="toggleDropdown">
                            Logout
                        </router-link>
                    </p>
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

<style scoped>
    .section {
        padding: 0 1.5rem;
    }
    .container {
        padding: .5rem 0;
    }
</style>

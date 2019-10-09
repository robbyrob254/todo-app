<template>
    <section class="hero is-fullheight-with-navbar">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-two-thirds-tablet is-half-widescreen">
                        <div class="box">
                            <form @submit.prevent="login">
                                <div class="field">
                                    <p class="control">
                                        <input class="input" type="email" placeholder="Email"
                                            v-model="username"
                                            :class="{ 'is-danger': hasError }">
                                    </p>
                                </div>
                                <div class="field">
                                    <p class="control">
                                        <input class="input" type="password" placeholder="Password"
                                            v-model="password"
                                            :class="{ 'is-danger': hasError }">
                                    </p>
                                    <p class="help is-danger">{{ serverError }}</p>
                                </div>
                                <div class="field">
                                    <p class="control">
                                        <button class="button is-success">
                                            Login
                                        </button>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
                serverError: '',
            }
        },
        methods: {
            login() {
                this.serverError = ''
                this.$store.dispatch('login', {
                    username: this.username,
                    password: this.password
                })
                .then(res => {
                    this.$router.push('/tasks')
                })
                .catch(err => {
                    console.log(err)
                    if(err.hasOwnProperty('message'))
                        this.serverError = err.message
                })
            }
        },
        computed: {
            hasError() {
                return this.serverError !== ''
            }
        }
    }
</script>

<style scoped>
    .hero-body {
        flex-grow: 0;
    }
</style>

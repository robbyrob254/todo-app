<template>
    <div class="box">
        <form @submit.prevent="login">
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="email" placeholder="Email"
                        v-model="username"
                        :class="{ 'is-danger': hasError }">
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="password" placeholder="Password"
                        v-model="password"
                        :class="{ 'is-danger': hasError }">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
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
                    this.$router.push('/todo')
                })
                .catch(err => {
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

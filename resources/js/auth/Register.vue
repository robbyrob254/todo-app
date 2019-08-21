<template>
    <div class="box">
        <strong>Register</strong>
        <form @submit.prevent="register">
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="text" placeholder="Name"
                        v-model="credentials.name"
                        :class="{ 'is-danger': hasNameError }">
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                </p>
                <p class="help is-danger">{{ errors.name }}</p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="email" placeholder="Email"
                        v-model="credentials.email"
                        :class="{ 'is-danger': hasEmailError}">
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </p>
                <p class="help is-danger">{{ errors.email }}</p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="password" placeholder="Password"
                        v-model="credentials.password"
                        :class="{ 'is-danger': hasPasswordError }">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="password" placeholder="Confirm password"
                        v-model="credentials.password_confirmation"
                        :class="{ 'is-danger': hasPasswordError }">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
                <p class="help is-danger">{{ errors.password }}</p>
            </div>
            <div class="field">
                <p class="control">
                    <button class="button is-success">
                        Create Account
                    </button>
                </p>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Register',
        data() {
            return {
                credentials: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                },
                errors: {
                    name: '',
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            register() {
                this.errors.name = ''
                this.errors.email = ''
                this.errors.password = ''
                this.$store.dispatch('register', this.credentials)
                .then(res => {
                    this.$router.push('/todo')
                })
                .catch(err => {
                    if(err.hasOwnProperty('name'))
                        this.errors.name = err.name.join(',')
                    if(err.hasOwnProperty('email'))
                        this.errors.email = err.email.join(',')
                    if(err.hasOwnProperty('password'))
                        this.errors.password = err.password.join(',')
                })
            }
        },
        computed: {
            hasEmailError() {
                return this.errors.email !== ''
            },
            hasNameError() {
                return this.errors.name !== ''
            },
            hasPasswordError() {
                return this.errors.password !== ''
            }
        }
    }
</script>

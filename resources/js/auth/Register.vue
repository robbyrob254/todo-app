<template>
    <div class="box">
        <strong>Register</strong>
        <form @submit.prevent="register">
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="text" placeholder="Name" v-model="credentials.name">
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="email" placeholder="Email" v-model="credentials.email">
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="password" placeholder="Password" v-model="credentials.password">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="password" placeholder="Password" v-model="credentials.password_confirmation">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
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
                }
            }
        },
        methods: {
            register() {
                this.$store.dispatch('register', this.credentials)
                .then(res => {
                    this.$router.push('/todo')
                })
                .catch(err => console.log(err))
            }
        }
    }
</script>

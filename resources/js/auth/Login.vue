<template>
    <div class="box">
        <form @submit.prevent="login">
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="email" placeholder="Email" v-model="username">
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="password" placeholder="Password" v-model="password">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
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
                password: ''
            }
        },
        methods: {
            login() {
                fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    })
                })
                .then(res => res.json())
                .then(res => {
                    localStorage.setItem('access_token', res.access_token)
                    this.$router.push('/todo')
                })
                .catch(err => console.log(err))
            }
        }
    }
</script>

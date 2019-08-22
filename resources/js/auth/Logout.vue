<template>

</template>

<script>
    export default {
        name: 'Logout',
        created() {
            fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.$store.getters.loggedIn
                }
            })
            .then(res => res.json())
            .then(res => {
                if(window.accessToken !== null) {
                    localStorage.removeItem('access_token')
                    this.$store.commit('updateToken', null)
                }
                this.$router.push('/')
            })
            .catch(err => console.log(err))
        }
    }
</script>

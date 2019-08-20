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
                    'Authorization': 'Bearer ' + window.accessToken
                }
            })
            .then(res => res.json())
            .then(res => {
                if(window.accessToken !== null) {
                    localStorage.removeItem('access_token')

                    this.$router.push('/')
                }
            })
            .catch(err => {
                console.log(err)
                if(window.accessToken !== null) {
                    localStorage.removeItem('access_token')

                }
            })
        }
    }
</script>

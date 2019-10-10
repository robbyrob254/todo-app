<template>
    <form @submit.prevent="addTask">
        <div class="field">
            <label class="label">New Task</label>
            <div class="field has-addons">
                <div class="control is-expanded">
                    <input class="input" type="text" placeholder="Task name" v-model="title">
                </div>
                <div class="control">
                    <button class="button is-info">
                        Create
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name: 'TaskForm',
        data() {
            return {
                title: ''
            }
        },
        methods: {
            addTask() {
                fetch('api/task', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + this.$store.getters.loggedIn
                    },
                    body: JSON.stringify({
                        title: this.title
                    })
                })
                .then(res => res.json())
                .then(res => {
                    this.$store.dispatch('fetchTasks')
                    this.title = ''
                })
                .catch(err => console.log(err))
            }
        }
    }
</script>

<style scoped>

</style>

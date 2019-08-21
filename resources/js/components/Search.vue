<template>
    <form class="box" @submit.prevent="searchTasks">
        <div class="field">
            <label class="label">Search Tasks</label>
            <div class="field has-addons">
                <div class="control is-expanded">
                    <input class="input" type="text" placeholder="Task name"
                        v-model="query"
                        v-on:keyup="searchTasks">
                </div>
                <div class="control">
                    <button class="button is-info">
                        Search
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name: 'Search',
        data() {
            return {
                query: ''
            }
        },
        methods: {
            searchTasks() {
                this.$store.dispatch('addParameter', {
                    type: 'q',
                    value: this.query.trim()
                })
                this.$store.dispatch('fetchTasks')
            }
        }
    }
</script>

<style scoped>

</style>

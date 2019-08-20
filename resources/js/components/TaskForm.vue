<template>
    <form class="box" @submit.prevent="addTask">
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

        methods: {
            addTask() {
                this.$store.dispatch('addTask')
            }
        },
        computed: {
            title: {
                get() {
                    return this.$store.state.title
                },
                set(value) {
                    this.$store.commit('updateTitle', value)
                }
            }
        }
    }
</script>

<style scoped>

</style>

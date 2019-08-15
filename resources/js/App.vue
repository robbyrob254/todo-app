<template>
    <div>
        <task-form
            v-on:fetch-tasks="fetchTasks">
        </task-form>
        <task-list
            v-on:fetch-tasks="fetchTasks"
            v-bind:tasks="tasks">
        </task-list>
    </div>
</template>

<script>
    import TaskForm from './components/TaskForm.vue'
    import TaskList from './components/TaskList.vue'

    export default {
        name: 'App',
        components: {
            TaskForm,
            TaskList
        },
        data() {
            return {
                tasks: []
            }
        },
        created() {
            this.fetchTasks()
        },
        methods: {
            fetchTasks(page_url) {
                page_url = page_url || '/api/tasks'
                fetch(page_url)
                    .then(res => res.json())
                    .then(res => {
                        this.tasks = res.data
                    })
                    .catch(err => console.log(err))
            },
        }
    }
</script>

<style scoped>

</style>

<template>
    <div>
        <search
            v-on:fetch-tasks="fetchTasks"
            v-bind:path="pagination.path">
        </search>
        <task-form
            v-on:fetch-tasks="fetchTasks">
        </task-form>
        <div v-if="tasks.length !== 0">
            <task-list
                v-on:fetch-tasks="fetchTasks"
                v-bind:tasks="tasks">
            </task-list>
            <pagination
                v-on:fetch-tasks="fetchTasks"
                v-bind:pagination="pagination">
            </pagination>
        </div>
        <div v-else>
            <p>No tasks found.</p>
        </div>
    </div>
</template>

<script>
    import Search from './components/Search.vue'
    import TaskList from './components/TaskList.vue'
    import Pagination from './components/Pagination.vue'
    import TaskForm from './components/TaskForm.vue'

    export default {
        name: 'App',
        components: {
            Search,
            TaskList,
            Pagination,
            TaskForm
        },
        data() {
            return {
                tasks: [],
                pagination: {
                    prev_url: '',
                    next_url: '',
                    path: '',
                    current_page: '',
                    last_page: ''
                }
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
                        this.pagination.prev_url = res.links.prev
                        this.pagination.next_url = res.links.next
                        this.pagination.path = res.meta.path
                        this.pagination.current_page = res.meta.current_page
                        this.pagination.last_page = res.meta.last_page
                    })
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style scoped>

</style>

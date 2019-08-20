<template>
    <div>
        <search></search>
        <task-form></task-form>
        <task-filter></task-filter>
        <div v-if="$store.state.tasks.length !== 0">
            <task-list></task-list>
            <pagination></pagination>
        </div>
        <div v-else>
            <p>No tasks found.</p>
        </div>
    </div>
</template>

<script>
    import Search from './components/Search.vue'
    import TaskFilter from './components/TaskFilter.vue'
    import TaskList from './components/TaskList.vue'
    import Pagination from './components/Pagination.vue'
    import TaskForm from './components/TaskForm.vue'

    export default {
        name: 'App',
        components: {
            Search,
            TaskFilter,
            TaskList,
            Pagination,
            TaskForm
        },
        created() {
            this.fetchTasks()
            eventBus.$on('fetchTasks', () => this.fetchTasks())
        },
        methods: {
            fetchTasks() {

                fetch(this.$store.getters.path)
                    .then(res => res.json())
                    .then(res => {
                        if(this.$store.state.params.page > res.meta.last_page) {
                            this.$store.state.params.page = res.meta.last_page
                            this.fetchTasks()
                        } else {
                            // only need the page number not the whole path
                            if(res.links.prev !== null)
                                res.links.prev = res.links.prev.substring(res.links.prev.length -1)
                            if(res.links.next !== null)
                                res.links.next = res.links.next.substring(res.links.next.length -1)

                            this.$store.commit('updatePagination', {
                                links: res.links,
                                meta: res.meta
                            });
                            this.$store.commit('updateTasks', res.data)
                        }
                    })
                    .catch(err => console.log(err))
            }

        }
    }
</script>

<style scoped>

</style>

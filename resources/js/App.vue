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
            eventBus.$on('fetchTasks', (url) => this.fetchTasks(url))
            eventBus.$on('toggleFilter', () => this.toggleFilter())
            eventBus.$on('addParameter', (key, value) => this.addParameter(key, value))
        },
        methods: {
            fetchTasks(page_url) {
                page_url = page_url || '/api/tasks?sort=' + this.$store.state.params.sort
                fetch(page_url)
                    .then(res => res.json())
                    .then(res => {
                        // if current page request is greater than
                        // the total number of pages
                        if(this.$store.state.params.page > res.meta.last_page) {
                            // set current page to last available
                            this.$store.state.params.page = res.meta.last_page
                            this.fetchTasks(this.buildURL)
                        } else {
                            // set component data
                            if(res.links.prev !== null)
                                res.links.prev = res.links.prev.substring(res.links.prev.length -1)
                            if(res.links.next !== null)
                                res.links.next = res.links.next.substring(res.links.next.length -1)
                            this.$store.state.tasks = res.data
                            this.$store.state.pagination.prev = res.links.prev
                            this.$store.state.pagination.next = res.links.next
                            this.$store.state.pagination.path = res.meta.path
                            this.$store.state.pagination.current_page = res.meta.current_page
                            this.$store.state.pagination.last_page = res.meta.last_page
                        }
                    })
                    .catch(err => console.log(err))
            },
            addParameter(key, value) {
                this.$store.state.params[key] = value
                this.fetchTasks(this.buildURL)
            },
            toggleFilter() {
                this.$store.state.filter.all = false
                this.$store.state.filter.active = false
                this.$store.state.filter.completed = false
                this.$store.state.filter[this.$store.state.params.filter] = true
            }

        },
        computed: {
            // build url string from params
            buildURL() {
                let url = '/api/tasks?'
                for(const prop in this.$store.state.params){
                    if(this.$store.state.params[prop] !== ''){
                        url += prop + '=' + this.$store.state.params[prop] + '&'
                    }
                }
                return url.substring(0, url.length - 1)
            }
        }
    }
</script>

<style scoped>

</style>

<template>
    <div>
        <search></search>
        <task-form></task-form>
        <task-filter
            v-bind:filter="filter">
        </task-filter>
        <div v-if="tasks.length !== 0">
            <task-list
                v-bind:tasks="tasks">
            </task-list>
            <pagination
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
        data() {
            return {
                tasks: [],
                params: {
                    q: '',
                    filter: 'all',
                    view: '5',
                    sort: 'new',
                    page: '1'
                },
                filter: {
                    all: true,
                    active: false,
                    completed: false
                },
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
            eventBus.$on('fetchTasks', (url) => this.fetchTasks(url))
            eventBus.$on('toggleFilter', () => this.toggleFilter())
            eventBus.$on('addParameter', (key, value) => this.addParameter(key, value))
        },
        methods: {
            fetchTasks(page_url) {
                page_url = page_url || '/api/tasks?sort=' + this.params.sort
                fetch(page_url)
                    .then(res => res.json())
                    .then(res => {
                        // if current page request is greater than
                        // the total number of pages
                        if(this.params.page > res.meta.last_page) {
                            // set current page to last available
                            this.params.page = res.meta.last_page
                            this.fetchTasks(this.buildURL)
                        } else {
                            // set component data
                            if(res.links.prev !== null)
                                res.links.prev = res.links.prev.substring(res.links.prev.length -1)
                            if(res.links.next !== null)
                                res.links.next = res.links.next.substring(res.links.next.length -1)
                            this.tasks = res.data
                            this.pagination.prev = res.links.prev
                            this.pagination.next = res.links.next
                            this.pagination.path = res.meta.path
                            this.pagination.current_page = res.meta.current_page
                            this.pagination.last_page = res.meta.last_page
                        }
                    })
                    .catch(err => console.log(err))
            },
            addParameter(key, value) {
                this.params[key] = value
                this.fetchTasks(this.buildURL)
            },
            toggleFilter() {
                this.filter.all = false
                this.filter.active = false
                this.filter.completed = false
                this.filter[this.params.filter] = true
            }

        },
        computed: {
            // build url string from params
            buildURL() {
                let url = '/api/tasks?'
                for(const prop in this.params){
                    if(this.params[prop] !== ''){
                        url += prop + '=' + this.params[prop] + '&'
                    }
                }
                return url.substring(0, url.length - 1)
            }
        }
    }
</script>

<style scoped>

</style>

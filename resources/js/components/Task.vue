<template>
    <div class="section">
        <h2>Tasks</h2>
        <form class="box" @submit.prevent="addTask">
            <div class="field">
                <label class="label">Task</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Text input" v-model="task.title">
                </div>
            </div>
            <div class="field is-grouped is-grouped-right">
                <div class="control">
                    <button type="submit" class="button is-link">Submit</button>
                </div>
                <div class="control">
                    <button type="button" class="button is-text">Cancel</button>
                </div>
            </div>
        </form>
        <nav class="pagination is-centered" role="navigation" aria-label="pagination">
            <a class="pagination-previous"
                v-bind="[{ disabled: !pagination.prev_page_url }]"
                @click="fetchTasks(pagination.prev_page_url)">
                Previous</a>
            <a class="pagination-next"
                v-bind="[{ disabled: !pagination.next_page_url }]"
                @click="fetchTasks(pagination.next_page_url)">
                Next page</a>
            <ul class="pagination-list">
                <li>{{ pagination.current_page }}</li>
                <li>of</li>
                <li>{{ pagination.last_page }}</li>
            </ul>
        </nav>
        <div class="notification"
            v-for="task in tasks"
            v-bind:key="task.id">
            <button class="delete" @click="deleteTask(task)"></button>
            <h4>{{ task.title }}</h4>
            <form>
                <label class="checkbox">
                    <input type="checkbox">
                    Remember me
                </label>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        },

        data() {
            return {
                tasks: [],
                task: {
                    id: '',
                    title: '',
                    completed: '',
                },
                pagination: {},
                edit: false
            }
        },

        created() {
            this.fetchTasks()
        },

        methods: {
            fetchTasks(page_url) {
                let vm = this
                page_url = page_url || '/api/tasks'
                fetch(page_url)
                    .then(res => res.json())
                    .then(res => {
                        this.tasks = res.data
                        vm.makePagination(res.meta, res.links)
                    })
                    .catch(err => console.log(err))
            },

            makePagination(meta, links) {
                let pagination = {
                    current_page: meta.current_page,
                    last_page: meta.last_page,
                    prev_page_url: links.prev,
                    next_page_url: links.next
                }

                this.pagination = pagination
            },

            addTask() {
                if(!this.edit) {
                    // add
                    fetch('api/task', {
                        method: 'post',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(this.task)
                    })
                    .then(res => res.json())
                    .then(res => {
                        this.task.id = ''
                        this.task.title = ''
                        this.fetchTasks()
                    })
                    .catch(err => console.log(err))
                } else {
                    // update
                    console.log('edit')
                }
            },

            deleteTask(task) {
                if(confirm(`Delete ${task.title}?`)) {
                    fetch(`api/task/${task.id}`, {
                        method: 'delete'
                    })
                    .then(res => res.json())
                    .then(res => {
                        this.fetchTasks()
                    })
                    .catch(err => console.log(err))
                }
            },

            completeTask(task) {

            }
        }
    }
</script>

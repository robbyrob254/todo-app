<template>
    <form class="box" @submit.prevent="addTask">
        <div class="field">
            <label class="label">New Task</label>
            <div class="field has-addons">
                <div class="control is-expanded">
                    <input class="input" type="text" placeholder="Task name" v-model="task.title">
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
                task: {
                    title: ''
                },
            }
        },
        methods: {
            addTask() {
                if(this.task.title.trim() !== ''){
                    this.task.title = this.task.title.trim()
                    fetch('api/task', {
                        method: 'post',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(this.task)
                    })
                    .then(res => res.json())
                    .then(res => {
                        this.task.title = ''
                        this.$emit('fetch-tasks')
                    })
                    .catch(err => console.log(err))
                }
            },
        }
    }
</script>

<style scoped>

</style>

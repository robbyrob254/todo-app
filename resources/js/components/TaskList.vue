<template>
    <ul class="list">
        <li v-for="task in tasks" v-bind:key="task.id">
            <task-item v-bind:task="task"
                v-on:tog-task="toggleTask"
                v-on:del-task="deleteTask" />
        </li>
    </ul>
</template>

<script>
    import TaskItem from './TaskItem.vue';

    export default {
        name: 'TaskList',
        props: ['tasks'],
        components: {
            TaskItem
        },
        methods: {
            toggleTask(task) {
                fetch('api/task', {
                    method: 'put',
                    headers: {
                            'content-type': 'application/json'
                        },
                    body: JSON.stringify(task)
                })
                .then(res => res.json())
                .then(res => {
                    this.$emit('fetch-tasks')
                })
                .catch(err => console.log(err))
            },

            deleteTask(task) {
                if(confirm(`Delete ${task.title}?`)) {
                    fetch(`api/task/${task.id}`, {
                        method: 'delete'
                    })
                    .then(res => res.json())
                    .then(res => {
                        this.$emit('fetch-tasks')
                    })
                    .catch(err => console.log(err))
                }
            },
        }
    }
</script>

<style scoped>
    ul {
        list-style-type: none;
    }

    li:not(:last-child) {
        border-bottom: 1px solid rgba(10,10,10,.1);
    }
</style>

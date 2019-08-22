<template>
    <div class="list-item flex-between"
        :class="{'m': editing}">
        <input type="checkbox"
            :class="{'mr': editing}"
            :checked="task.completed == true"
            @click="toggleTask">
        <h4 :class="{'is-complete': task.completed}"
            v-show="!editing"
            @dblclick="editStart">
            {{ task.title }}
        </h4>
        <input class="input" type="text"
            v-show="editing"
            v-model="task.title"
            @keyup.enter="editFinish">
        <button class="delete has-background-danger"
            @click="deleteTask">
            X
        </button>
    </div>
</template>

<script>
    export default {
        name: 'TaskItem',
        props: ['task'],
        data() {
            return {
                editing: false
            }
        },
        methods: {
            editFinish() {
                this.editing = false
                this.updateTask()
            },
            editStart() {
                this.editing = true
            },
            toggleTask() {
                this.task.completed = !this.task.completed
                this.updateTask()
            },
            deleteTask() {
                if(confirm(`Delete ${this.task.title}?`)) {
                    fetch(`api/task/${this.task.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + this.$store.getters.loggedIn
                        }
                    })
                    .then(res => res.json())
                    .then(res => {
                        this.$store.dispatch('fetchTasks')
                    })
                    .catch(err => console.log(err))
                }
            },
            updateTask() {
                fetch(`api/task/${this.task.id}`, {
                    method: 'PUT',
                    headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + this.$store.getters.loggedIn
                        },
                    body: JSON.stringify(this.task)
                })
                .then(res => res.json())
                .then(res => {
                    this.$store.dispatch('fetchTasks')
                })
                .catch(err => console.log(err))
            }
        }
    }
</script>

<style scoped>
    .is-complete {
        text-decoration: line-through;
    }
    .field {
        margin: 0;
    }
    .flex-between {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.25rem;
    }
    .m {
        padding: .6rem 1.25rem;
    }
    .mr {
        margin-right: .4rem;
    }
    input {
        margin-right: 1rem;
    }
    h4 {
        flex-grow: 1;
    }

</style>

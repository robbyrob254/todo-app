<template>
    <div class="list-item">
        <input type="checkbox"
            :checked="task.completed == true"
            @click="toggleTask">
        <h4 v-bind:class="{'is-complete': task.completed}">
            {{ task.title }}
        </h4>
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
        methods: {
            toggleTask() {
                this.$store.dispatch('toggleTask', this.task)
            },
            deleteTask() {
                if(confirm(`Delete ${this.task.title}?`)) {
                    this.$store.dispatch('deleteTask', this.task.id)
                }
            },
        }
    }
</script>

<style scoped>
    .is-complete {
        text-decoration: line-through;
    }

    .list-item {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.25rem;
    }

    input {
        margin-right: 1rem;
    }

    h4 {
        flex-grow: 1;
    }

</style>

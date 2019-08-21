<template>
    <div class="list-item flex-between">
        <input type="checkbox"
            v-show="!editing"
            :checked="task.completed == true"
            @click="toggleTask">
        <h4 v-if="!editing"
            v-bind:class="{'is-complete': task.completed}"
            @dblclick="editTask">
            {{ task.title }}
        </h4>
        <div v-else class="field is-grouped">
            <div class="control">
                <a class="button is-info">
                    Cancel
                </a>
            </div>
            <div class="control is-expanded">
                <input class="input" type="text" v-model="task.title">
            </div>
            <div class="control">
                <a class="button is-info">
                    Edit
                </a>
            </div>
        </div>
        <button class="delete has-background-danger"
            v-show="!editing"
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
            editTask() {

            },
            toggleTask() {
                console.log(this.task)
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

    input {
        margin-right: 1rem;
    }

    h4 {
        flex-grow: 1;
    }

</style>

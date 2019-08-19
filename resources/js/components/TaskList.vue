<template>
    <ul class="list">
        <li v-for="task in this.$store.state.tasks" v-bind:key="task.id">
            <task-item v-bind:task="task" />
        </li>
    </ul>
</template>

<script>
    import TaskItem from './TaskItem.vue';

    export default {
        name: 'TaskList',
        components: {
            TaskItem
        }
    }
</script>

<style scoped>
    ul {
        list-style-type: none;
        box-shadow: none;
    }

    li:not(:last-child) {
        border-bottom: 1px solid rgba(10,10,10,.1);
    }
</style>

<template>
    <div class="container">
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
    import TaskFilter from '../components/TaskFilter.vue'
    import TaskList from '../components/TaskList.vue'
    import Pagination from '../components/Pagination.vue'
    import TaskForm from '../components/TaskForm.vue'

    export default {
        name: 'App',
        components: {
            TaskFilter,
            TaskList,
            Pagination,
            TaskForm
        },
        created() {
            this.$store.dispatch('fetchTasks')
        }
    }
</script>

<style scoped>
    .hero-body {
        flex-grow: 0;
    }
</style>

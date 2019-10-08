<template>
    <section class="hero is-fullheight-with-navbar">
        <div class="hero-body">
            <div class="container">
                <task-form></task-form>
                <search></search>
                <task-filter></task-filter>
                <div v-if="$store.state.tasks.length !== 0">
                    <task-list></task-list>
                    <pagination></pagination>
                </div>
                <div v-else>
                    <p>No tasks found.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Search from '../components/Search.vue'
    import TaskFilter from '../components/TaskFilter.vue'
    import TaskList from '../components/TaskList.vue'
    import Pagination from '../components/Pagination.vue'
    import TaskForm from '../components/TaskForm.vue'

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
            this.$store.dispatch('fetchTasks')
        }
    }
</script>

<style scoped>
    .hero-body {
        flex-grow: 0;
    }
</style>

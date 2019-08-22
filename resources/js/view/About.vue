<template>
    <section class="hero is-fullheight-with-navbar">
        <div class="hero-body">
            <div class="container">
                <h3>About</h3>
                <p>A todo list featuring</p>
                <ul>
                    <li>Create new task</li>
                    <li>Search and filter tasks</li>
                    <li>Update task name and status</li>
                    <li>Delete task</li>
                </ul>
                <p>FAQ</p>
                <ul>
                    <li>How do I create a new task?</li>
                    <li>How do I edit the task name?</li>
                    <li>How do I mark a task completed?</li>
                    <li>How do I delete a task?</li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'About'
    }
</script>

<style scoped>
    .hero-body {
        flex-grow: 0;
    }
</style>

<template>
    <nav class="pagination is-centered"
        role="navigation"
        aria-label="pagination"
        v-show="hasPagination()">
        <a class="pagination-previous"
            :disabled="pagination.prev === null"
            @click="fetchPage(pagination.prev)">
            Previous
        </a>
        <a class="pagination-next"
            :disabled="pagination.next_url === null"
            @click="fetchPage(pagination.next)">
            Next page
        </a>
        <ul class="pagination-list">
            <li v-for="page in pagination.last_page"
                :key="page">
                <a class="pagination-link"
                    :class="{ 'is-current': pagination.current_page === page }"
                    :aria-label="'Goto page ' + page"
                    @click="fetchPage(page)">
                    {{ page }}
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "Pagination",
        props: ['pagination'],
        methods: {
            fetchPage(num) {
                eventBus.$emit('addParameter', 'page', num)
            },
            hasPagination() {
                return !(this.pagination.prev === null && this.pagination.next === null)
            }
        }
    }
</script>

<style scoped>

</style>

<template>
    <nav class="pagination is-centered"
        role="navigation"
        aria-label="pagination"
        v-show="hasPagination()">
        <a class="pagination-previous"
            :disabled="$store.state.pagination.prev === null"
            @click="fetchPage($store.state.pagination.prev)">
            Previous
        </a>
        <a class="pagination-next"
            :disabled="$store.state.pagination.next_url === null"
            @click="fetchPage($store.state.pagination.next)">
            Next page
        </a>
        <ul class="pagination-list">
            <li v-for="page in $store.state.pagination.last_page"
                :key="page">
                <a class="pagination-link"
                    :class="{ 'is-current': $store.state.pagination.current_page === page }"
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
        methods: {
            fetchPage(num) {
                eventBus.$emit('addParameter', 'page', num)
            },
            hasPagination() {
                return this.$store.getters.hasPagination
            }
        }
    }
</script>

<style scoped>

</style>

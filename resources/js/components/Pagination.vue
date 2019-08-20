<template>
    <nav class="pagination is-centered"
        role="navigation"
        aria-label="pagination"
        v-show="!$store.getters.hasPagination">
        <a class="pagination-previous"
            :disabled="$store.state.pagination.prev === null"
            @click="fetchPage($store.state.pagination.prev)">
            Previous
        </a>
        <a class="pagination-next"
            :disabled="$store.state.pagination.next === null"
            @click="fetchPage($store.state.pagination.next)">
            Next page
        </a>
        <ul class="pagination-list">
            <li v-for="page in $store.state.pagination.last"
                :key="page">
                <a class="pagination-link"
                    :class="{ 'is-current': $store.state.pagination.current === page }"
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
                this.$store.dispatch('addParameter', {
                    type: 'page',
                    value: num
                })
            },
        }

    }
</script>

<style scoped>

</style>

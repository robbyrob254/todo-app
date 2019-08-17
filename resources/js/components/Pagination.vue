<template>
    <nav class="pagination is-centered" role="navigation" aria-label="pagination"
        v-show="hasPagination">
        <a class="pagination-previous"
            :disabled="pagination.prev_url === null"
            @click="$emit('fetch-tasks', pagination.prev_url)">
            Previous
        </a>
        <a class="pagination-next"
            :disabled="pagination.next_url === null"
            @click="$emit('fetch-tasks', pagination.next_url)">
            Next page
        </a>
        <ul class="pagination-list">
            <li v-for="page in pagination.last_page"
                :key="page">
                <a class="pagination-link"
                    :class="{ 'is-current': pagination.current_page === page }"
                    :aria-label="'Goto page ' + page"
                    @click="$emit('fetch-tasks', pagination.path + '?page=' + page)">
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
        computed: {
            hasPagination() {
                return !(this.pagination.prev_url === null && this.pagination.next_url === null)
            }
        }
    }
</script>

<style scoped>

</style>

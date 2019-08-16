<template>
    <div class="menu">
        <div>
            <p><strong>Display</strong></p>
            <button class="button"
                :class="{'is-focused': filter.all}"
                @click="filterTasks('all')">
                All
            </button>
            <button class="button"
                :class="{'is-focused': filter.active}"
                @click="filterTasks('active')">
                Active
            </button>
            <button class="button"
                :class="{'is-focused': filter.completed}"
                @click="filterTasks('completed')">
                Completed
            </button>
        </div>
        <div>
            <p><strong>Sort by</strong></p>
            <div class="select">
                <select v-model="sort"
                    @change="sortTasks">
                    <option value="new" selected>Newest</option>
                    <option value="old">Oldest</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TaskFilter',
        props: ['filter'],
        data() {
            return {
                showDropdown: false,
                sort: 'new'
            }
        },
        methods: {
            filterTasks(option) {
                this.$emit('add-parameter', 'filter', option)
                this.$emit('toggle-filter')
            },
            sortTasks() {
                this.$emit('add-parameter', 'sort', this.sort)
            }
        }
    }
</script>

<style scoped>
    .menu {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin-bottom: 1rem;
    }
</style>

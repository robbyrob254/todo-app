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
            <div class="ib">
                <p><strong>Sort by</strong></p>
                <div class="select">
                    <select v-model="sort"
                        @change="sortTasks">
                        <option value="new" selected>Newest</option>
                        <option value="old">Oldest</option>
                    </select>
                </div>
            </div>
            <div class="ib">
                <p><strong>Per page</strong></p>
                <div class="select">
                    <select v-model="view"
                        @change="viewTasks">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
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
                sort: 'new',
                view: '5'
            }
        },
        methods: {
            filterTasks(option) {
                this.$emit('add-parameter', 'filter', option)
                this.$emit('toggle-filter')
            },
            sortTasks() {
                this.$emit('add-parameter', 'sort', this.sort)
            },
            viewTasks() {
                this.$emit('add-parameter', 'view', this.view)
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

    .ib {
        display: inline-block;
    }
</style>

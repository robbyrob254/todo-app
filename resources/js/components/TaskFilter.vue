<template>
    <div class="menu">
        <div>
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
        <div class="dropdown is-right"
            :class="{'is-active': showDropdown}"
            @click="showDropdown = !showDropdown">
            <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>Dropdown button</span>
                    <span class="icon is-small">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                    <a href="#" class="dropdown-item">
                        Dropdown item
                    </a>
                    <a class="dropdown-item">
                        Other dropdown item
                    </a>
                    <a href="#" class="dropdown-item is-active">
                        Active dropdown item
                    </a>
                    <a href="#" class="dropdown-item">
                        Other dropdown item
                    </a>
                    <hr class="dropdown-divider">
                    <a href="#" class="dropdown-item">
                        With a divider
                    </a>
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
                showDropdown: false
            }
        },
        methods: {
            filterTasks(selected) {
                this.$emit('add-parameter', 'filter', selected)
                this.$emit('toggle-filter')
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

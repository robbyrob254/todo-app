<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a role="button" class="navbar-burger burger button" aria-label="menu" aria-expanded="false" data-target="filter">
                Filter
            </a>
        </div>

        <div id="filter" class="navbar-menu">
            <div class="navbar-start">
                <div class="navbar-item">
                    <div class="field">
                        <label class="label">Display</label>
                        <div class="field is-grouped">
                            <div class="control">
                                <button class="button"
                                    :class="{'is-focused': filter.all}"
                                    @click="filterTasks('all')">
                                    All
                                </button>
                            </div>
                            <div class="control">
                                <button class="button"
                                    :class="{'is-focused': filter.active}"
                                    @click="filterTasks('active')">
                                    Active
                                </button>
                            </div>
                            <div class="control">
                                <button class="button"
                                    :class="{'is-focused': filter.completed}"
                                    @click="filterTasks('completed')">
                                    Completed
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="field">
                        <label class="label">Sort by</label>
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select v-model="sort" @change="sortTasks">
                                    <option value="new" selected>Newest</option>
                                    <option value="old">Oldest</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="navbar-item">
                    <div class="field">
                        <label class="label">Per Page</label>
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select v-model="view" @change="viewTasks">
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>

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
                eventBus.$emit('addParameter', 'filter', option)
                eventBus.$emit('toggleFilter')
            },
            sortTasks() {
                eventBus.$emit('addParameter', 'sort', this.sort)
            },
            viewTasks() {
                eventBus.$emit('addParameter', 'view', this.view)
            }
        }
    }
</script>

<style scoped>
    .navbar {
        margin-bottom: .5rem;
    }
    .navbar, .navbar-brand, .navbar-burger {
        min-height: auto;
        height: auto;
        width: auto;
    }
    .navbar-burger:hover {
        background-color: transparent;
    }
    .navbar-start {
        margin-left: -12px;
    }
    .navbar-end {
        margin-right: -12px;
    }
</style>

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
                                    :class="{'is-focused': hasFilter('all')}"
                                    @click="filterTasks('all')">
                                    All
                                </button>
                            </div>
                            <div class="control">
                                <button class="button"
                                    :class="{'is-focused': hasFilter('active')}"
                                    @click="filterTasks('active')">
                                    Active
                                </button>
                            </div>
                            <div class="control">
                                <button class="button"
                                    :class="{'is-focused': hasFilter('completed')}"
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
        data() {
            return {
                showDropdown: false,
                sort: 'new',
                view: '5'
            }
        },
        methods: {
            hasFilter(filter) {
                return this.$store.state.params.filter === filter
            },
            filterTasks(filter) {
                this.$store.commit('addParameter', {
                    type: 'filter',
                    value: filter
                })
                eventBus.$emit('fetchTasks')
            },
            sortTasks() {
                this.$store.commit('addParameter', {
                    type: 'sort',
                    value: this.sort
                })
                eventBus.$emit('fetchTasks')
            },
            viewTasks() {
                this.$store.commit('addParameter', {
                    type: 'view',
                    value: this.view
                })
                eventBus.$emit('fetchTasks')
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

    @media screen and (min-width: 769px) {
        .navbar-start {
            margin-left: -12px;
        }
        .navbar-end {
            margin-right: -12px;
        }
    }
</style>

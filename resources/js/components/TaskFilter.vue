<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a role="button" class="navbar-burger burger button" aria-label="menu" aria-expanded="false" data-target="filter"
                @click="toggleDropdown">
                Filter
            </a>
        </div>

        <div id="filter" class="navbar-menu" :class="{ 'is-active': showDropdown }">
            <div class="navbar-start">
                <div class="navbar-item">
                    <div class="field">
                        <label class="label">Display</label>
                        <div class="field is-grouped">
                            <div class="control">
                                <button class="button"
                                    :class="{'is-focused': hasFilter('all')}"
                                    @click="filterTasks('')">
                                    All
                                </button>
                            </div>
                            <div class="control">
                                <button class="button"
                                    :class="{'is-focused': hasFilter('active')}"
                                    @click="filterTasks(0)">
                                    Active
                                </button>
                            </div>
                            <div class="control">
                                <button class="button"
                                    :class="{'is-focused': hasFilter('completed')}"
                                    @click="filterTasks(1)">
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
                                    <option value="desc" selected>Newest</option>
                                    <option value="asc">Oldest</option>
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
import Search from '../components/Search.vue'

    export default {
        name: 'TaskFilter',
        components: {
            Search
        },
        data() {
            return {
                showDropdown: false,
                sort: 'desc',
                view: '5'
            }
        },
        methods: {
            hasFilter(filter) {
                return this.$store.getters.filter === filter
            },
            filterTasks(filter) {
                this.$store.dispatch('addParameter', {
                    type: 'active',
                    value: filter
                })
            },
            sortTasks() {
                this.$store.dispatch('addParameter', {
                    type: 'sort',
                    value: this.sort
                })
            },
            toggleDropdown() {
                this.showDropdown = !this.showDropdown
            },
            viewTasks() {
                this.$store.dispatch('addParameter', {
                    type: 'view',
                    value: this.view
                })
            }
        }
    }
</script>

<style scoped>
    .navbar {
        margin: .5rem 0;
    }
    .navbar, .navbar-brand, .navbar-burger {
        min-height: auto;
        height: auto;
        width: auto;
    }
    .navbar-burger:hover {
        background-color: transparent;
    }
</style>

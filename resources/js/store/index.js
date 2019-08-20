import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        token: null,
        tasks: [],
        params: {
            q: '',
            filter: 'all',
            view: '5',
            sort: 'new',
            page: '1'
        },
        filter: {
            all: true,
            active: false,
            completed: false
        },
        pagination: {
            current: '',
            prev: '',
            next: '',
            last: ''
        }
    },
    getters: {
        hasPagination(state) {
            return state.pagination.prev === null && state.pagination.next === null
        },
        loggedIn(state) {
            return state.token
        },
        page(state) {
            return state.params.page
        },
        path(state) {
            let path = '/api/tasks?'
            for(const prop in state.params){
                if(state.params[prop] !== ''){
                    path += prop + '=' + state.params[prop] + '&'
                }
            }
            return path.substring(0, path.length - 1)
        }
    },
    mutations: {
        addParameter(state, param) {
            state.params[param.type] = param.value
        },
        updatePagination(state, pagination) {
            state.pagination.current = pagination.meta.current_page
            state.pagination.prev = pagination.links.prev
            state.pagination.next = pagination.links.next
            state.pagination.last = pagination.meta.last_page
        },
        updateTasks(state, tasks) {
            state.tasks = tasks
        },
        toggleFilter(state, filter) {
            state.filter.all = false
            state.filter.active = false
            state.filter.completed = false
            state.filter[filter] = true
        }
    }
})

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
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
            prev: '',
            next: '',
            path: '',
            current_page: '',
            last_page: ''
        }
    },
    getters: {
        hasPagination(state) {
            return !(state.pagination.prev === null && state.pagination.next === null)
        }
    }
})

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        token: null,
        tasks: [],
        title: '',
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
        },
        title(state) {
            return state.title
        }
    },
    mutations: {
        updateParameter(state, param) {
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
        updateTitle(state, title) {
            state.title = title.trim()
        },
        emptyTitle(state) {
            state.title = ''
        },
        toggleFilter(state, filter) {
            state.filter.all = false
            state.filter.active = false
            state.filter.completed = false
            state.filter[filter] = true
        }
    },
    actions: {
        addParameter({dispatch, commit}, param) {
            // reset to first page for every param except page
            if(param.type !== 'page') {
                commit('updateParameter', {
                    type: 'page',
                    value: '1'
                })
            }

            commit('updateParameter', {
                type: param.type,
                value: param.value
            })

            dispatch('fetchTasks')
        },
        addTask({commit, dispatch, getters}) {
            fetch('api/task', {
                    method: 'post',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: getters.title
                    })
                })
                .then(res => res.json())
                .then(res => {
                    commit('emptyTitle')
                    dispatch('fetchTasks')
                })
                .catch(err => console.log(err))
        },
        deleteTask({dispatch}, id) {
            fetch(`api/task/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(res => {
                    dispatch('fetchTasks')
                })
                .catch(err => console.log(err))
        },
        fetchTasks({commit, getters}) {
            fetch(getters.path)
                .then(res => res.json())
                .then(res => {
                    // only need the page number not the whole path
                    if(res.links.prev !== null)
                        res.links.prev = res.links.prev.substring(res.links.prev.length -1)
                    if(res.links.next !== null)
                        res.links.next = res.links.next.substring(res.links.next.length -1)

                    commit('updatePagination', {
                        links: res.links,
                        meta: res.meta
                    });
                    commit('updateTasks', res.data)
                })
                .catch(err => console.log(err))
        },
        toggleTask({dispatch}, task) {
            fetch('api/task', {
                method: 'PUT',
                headers: {
                        'content-type': 'application/json'
                    },
                body: JSON.stringify(task)
            })
            .then(res => res.json())
            .then(res => {
                dispatch('fetchTasks')
            })
            .catch(err => console.log(err))
        }

    }

})

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        token: null,
        tasks: [],
        params: {
            q: '',
            active: '',
            view: '',
            sort: 'desc',
            page: ''
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
        filter(state) {
            return state.params.filter
        },
        hasPagination(state) {
            return state.pagination.prev === null && state.pagination.next === null
        },
        loggedIn(state) {
            return state.token
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
        logout(state) {
            state.tasks = [],
            state.params.q = ''
            state.params.filter = 'all'
            state.params.view = '5'
            state.params.sort = 'new'
            state.params.page = '1'
            state.filter.all = true
            state.filter.active = false
            state.filter.completed = false
            state.pagination.current = ''
            state.pagination.prev = ''
            state.pagination.next = ''
            state.pagination.last = ''
        },
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
        updateToken(state, token) {
            state.token = token
        },
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
        fetchTasks({commit, getters}) {
            console.log(getters.path)
            fetch(getters.path, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + getters.loggedIn
                }
            })
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
        login({commit}, credentials) {
            return new Promise((resolve, reject) => {
                fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        username: credentials.username,
                        password: credentials.password
                    })
                })
                .then(res => res.json())
                .then(res => {
                    if(res.hasOwnProperty('status') && res.status !== 200) {
                        throw res
                    }
                    localStorage.setItem('access_token', res.access_token)
                    commit('updateToken', res.access_token)
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
            })
        }
    }

})

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
        filter(state) {
            return state.params.filter
        },
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
        updateTitle(state, title) {
            state.title = title.trim()
        },
        updateToken(state, token) {
            state.token = token
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
        addTask({getters, dispatch}, title) {
            fetch('api/task', {
                    method: 'post',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': 'Bearer ' + getters.loggedIn
                    },
                    body: JSON.stringify({
                        title: title
                    })
                })
                .then(res => res.json())
                .then(res => {
                    dispatch('fetchTasks')
                })
                .catch(err => console.log(err))
        },
        deleteTask({getters, dispatch}, id) {
            fetch(`api/task/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + getters.loggedIn
                    }
                })
                .then(res => res.json())
                .then(res => {
                    dispatch('fetchTasks')
                })
                .catch(err => console.log(err))
        },
        fetchTasks({commit, getters}) {
            fetch(getters.path, {
                headers: {
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
        },
        logout({commit, getters}) {
            return new Promise((resolve, reject) => {
                fetch('/api/logout', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + getters.loggedIn
                    }
                })
                .then(res => res.json())
                .then(res => {
                    if(window.accessToken !== null) {
                        localStorage.removeItem('access_token')
                        commit('updateToken', null)
                    }
                    resolve(res)
                })
                .catch(err => {
                    console.log(err)
                    if(window.accessToken !== null) {
                        localStorage.removeItem('access_token')
                        commit('updateToken', null)
                    }
                    reject(res)
                })
            })
        },
        register({dispatch}, credentials) {
            return new Promise((resolve, reject) => {
                fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                })
                .then(res => res.json())
                .then(res => {
                    if(res.hasOwnProperty('status') && res.status !== 200) {
                        throw res.errors
                    }
                    dispatch('login', {
                        username: credentials.email,
                        password: credentials.password
                    })
                    .then(res => resolve(res))
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        toggleTask({getters, dispatch}, task) {
            fetch('api/task', {
                method: 'PUT',
                headers: {
                        'content-type': 'application/json',
                        'Authorization': 'Bearer ' + getters.loggedIn
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

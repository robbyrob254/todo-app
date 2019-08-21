/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue';
import {store} from './store/index.js';
import VueRouter from 'vue-router';
import routes from './routes';

window.eventBus = new Vue();

Vue.component('Master', require('./layouts/Master.vue').default);
Vue.use(VueRouter);


const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.loggedIn) {
            next({
                path: '/login'
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters.loggedIn) {
            next({
                path: '/todo'
            })
        } else {
                next()
        }
    } else {
        next()
    }
})

const app = new Vue({
    el: '#app',
    store: store,
    router: router
});

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

window.eventBus = new Vue();

Vue.component('Master', require('./layouts/Master.vue').default);
Vue.use(VueRouter);


const router = new VueRouter({
    routes
})

const app = new Vue({
    el: '#app',
    router: router
});


var Vue = require('vue');
window.Vue = Vue;

//import Echo from 'laravel-echo';
//window.io = require('socket.io-client');

import Vuex from 'vuex'
Vue.use(Vuex);

import Vuetify from 'vuetify'

require('font-awesome-webpack');

Vue.use(Vuetify);

import v from './mixins/validator.js';
Vue.mixin(v);

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Confirm from './lib/Confirm.vue'
Vue.component('confirm', Confirm);

export default function(routes, store, component, options) {
    const router = new VueRouter({
        routes,
        mode: 'history'
    });

    var store = new Vuex.Store(store);

    try {
        window.$ = window.jQuery = require('jquery');
    } catch (e) {}

    window.axios = require('axios');
    window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    let token = document.head.querySelector('meta[name="csrf-token"]');

    if (token) {
        window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
    } else {
        console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
    }

    const app = new Vue({
        el: '#app',
        router,
        store,
        render: (h) => h(component)
    });

    return app;
}

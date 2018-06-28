import bootstrap from './bootstrap';

import routes from './routes/app.routes.js'

import store from './store/app.store.js'

import App from './App.vue';

const app = bootstrap(routes, store, App);


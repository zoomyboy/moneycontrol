import bootstrap from './bootstrap.js'

import routes from './routes/login.routes.js';

import store from './store/login.store.js'

import Login from './Login.vue';

const app = bootstrap(routes, store, Login);

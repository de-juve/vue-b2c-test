import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import { tokenIsExpired } from '../utils/jwtToken-utils';
import LocalStorageService from '../services/localStorageService';
import * as types from '../store/mutation-types';
// import { tokenIsExpired } from '../utils/jwtToken-utils';

// The meta data for your routes
const meta = require('./meta.json');

// Function to create routes
// Is default lazy but can be changed
function route(path, view, name, children) {
  return {
    path,
    meta: meta[path],
    name,
    children,
    component: resolve => import(`@/pages/${view}.vue`).then(resolve),
  };
}

Vue.use(VueRouter);

const router = new VueRouter({
  // base: __dirname,
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    route('/login', 'Login', 'login'),
    route('/error', 'Error', 'error'),
    route('/', 'Main', null, [
      route('/', 'Home', 'home'),
      route('/test', 'Test', 'test'),
    ]),


    // Global redirect for 404
    { path: '*', redirect: '/' },
    // { path: '*', redirect: '/error', query: {code: 404, message: 'Page Not Found.'} }

  ],
});

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(r => r.meta.auth);
  const guestRequired = to.matched.some(r => r.meta.guest);
  const token = LocalStorageService.get('token');
  const tokenExpired = tokenIsExpired();

  if (token) {
    store.commit(types.LOGIN_SUCCESS, { token });
  }
  const authed = store.state.authorized;

  if (authRequired && (!authed || tokenExpired)) {
    next('/login');
  } else if (guestRequired && authed) {
    next('/');
  } else {
    /* eslint-disable no-undef */
    if (typeof ga !== 'undefined') {
      ga('set', 'page', to.path);
      ga('send', 'pageview');
    }
    next();
  }
});

export default router;

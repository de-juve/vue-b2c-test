import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import user from './modules/user';

Vue.use(Vuex);

const state = {
  authorized: false,
  token: null,
  error_message: '',
};

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    user,
  },
  strict: process.env.NODE_ENV !== 'production',
});

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations',
    './modules/user',
  ], () => {
    const newGetters = import('./getters').default;
    const newActions = import('./actions').default;
    const newMutations = import('./mutations').default;
    const newModuleUser = import('./modules/user').default;
    store.hotUpdate({
      getters: newGetters,
      actions: newActions,
      mutations: newMutations,
      modules: {
        user: newModuleUser,
      },
    });
  });
}

export default store;

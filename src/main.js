import Vue from 'vue';

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VProgressLinear,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCard,
  VForm,
  VTextField,
  VSnackbar,
  VDivider,
  VAvatar,
  transitions,
} from 'vuetify';
import VeeValidate from 'vee-validate';

import App from './App';
import router from './router';
import store from './store';

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VProgressLinear,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCard,
    VForm,
    VTextField,
    VSnackbar,
    VDivider,
    VAvatar,
    transitions,
  },
});
Vue.use(VeeValidate);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});

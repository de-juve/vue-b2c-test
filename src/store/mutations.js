import * as types from './mutation-types';

const mutations = {
  [types.LOGIN_REQUEST](state) {
    state.error_message = '';
  },
  [types.LOGIN_SUCCESS](state, { token }) {
    state.authorized = true;
    state.token = token;
    localStorage.setItem('token', token);
  },

  [types.LOGIN_FAILURE](state, { view, message }) {
    state.error_message = view ? message : 'Ошибка авторизации';
  },

  [types.LOGOUT](state) {
    state.authorized = false;
    state.token = null;
    localStorage.removeItem('token');
  },
};

export default mutations;

/*
export function LOGIN_REQUEST(state) {
  state.error_message = '';
}

export function LOGIN_SUCCESS(state, { token }) {
  state.authorized = true;
  state.token = token;
}

export function LOGIN_FAILURE(state, { view, message }) {
  state.error_message = view ? message : 'Ошибка авторизации';
}

export function LOGOUT(state) {
  state.authorized = false;
  state.token = null;
}
*/

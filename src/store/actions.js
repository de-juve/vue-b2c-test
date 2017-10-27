import * as types from './mutation-types';
import user from '../api/user';

const actions = {
  login({ commit }, payload) {
    commit(types.LOGIN_REQUEST);
    user.login(
      payload,
      response => commit(types.LOGIN_SUCCESS, response.data),
      (err) => {
        commit(types.LOGIN_FAILURE, err);
        if (err.logout) {
          commit(types.LOGOUT);
        }
      },
    );
  },
  logout({ commit }) {
    commit(types.LOGOUT);
  },
};
export default actions;

/* export const login = ({ commit }, payload) => {
  commit(types.LOGIN_REQUEST);
  user.login(
    payload,
    response => commit(types.LOGIN_SUCCESS, response.data),
    (err) => {
      commit(types.LOGIN_FAILURE, err);
      if (err.logout) {
        commit(types.LOGOUT);
      }
    },
  );
};

export const logout = ({ commit }) => {
  commit(types.LOGOUT);
}; */


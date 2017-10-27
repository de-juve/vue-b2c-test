import * as types from '../mutation-types';
import userAPI from '../../api/user';

// getters
const getters = {
  userProfile: state => state.profile,
  error: state => state.error_message,
};

// actions
const actions = {
  get({ commit }, userID) {
    if (Number.isInteger(userID)) {
      commit(types.PROFILE_REQUEST);
      userAPI.getProfile(
        userID,
        response => commit(types.PROFILE_SUCCESS, response.data),
        (err) => {
          commit(types.PROFILE_FAILURE, err);
          if (err.logout) {
            commit(types.LOGOUT, null, { root: true });
          }
        },
      );
    } else {
      commit(types.PROFILE_FAILURE, { view: 1, message: 'Не известен id' });
    }
  },
};

// mutations
const mutations = {
  [types.PROFILE_REQUEST](state) {
    state.error_message = '';
  },
  [types.PROFILE_SUCCESS](state, { user }) {
    state.profile = user;
  },
  [types.PROFILE_FAILURE](state, { view, message }) {
    state.error_message = view ? message : 'Ошибка загрузки профиля';
  },
};

const state = {
  profile: {
    name: '',
  },
  error_message: '',
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

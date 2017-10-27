import UserService from '../services/userService';

const getters = {
  userID: (state) => {
    if (state.authorized) {
      return UserService.getUserID();
    }
    return null;
  },
  isSuperAdmin: (state) => {
    if (state.authorized) {
      return UserService.isSuperAdmin();
    }
    return false;
  },
};

export default getters;

/* export const userID = (state) => {
  const payload = getTokenPayload(state.token);
  if (payload && payload.sub) {
    return payload.sub;
  }
  return null;
};

export const error = state => state.error_message; */


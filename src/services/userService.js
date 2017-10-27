import { getTokenPayload } from '../utils/jwtToken-utils';

export default {
  getUserID() {
    const payload = getTokenPayload();
    if (payload && payload.sub) {
      return payload.sub;
    }
    return null;
  },
  isSuperAdmin() {
    const payload = getTokenPayload();
    if (payload && payload.is_admin_admin) {
      return payload.is_admin_admin;
    }
    return false;
  },
};

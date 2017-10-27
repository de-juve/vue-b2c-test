import LocalStorageService from '../services/localStorageService';

export function getTokenPayload() {
  const token = LocalStorageService.get('token');
  if (token && token.split('.').length === 3) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(decodeURIComponent(encodeURIComponent(window.atob(base64))));
    } catch (e) {
      return null;
    }
  }
  return null;
}

export function tokenIsExpired() {
  const token = LocalStorageService.get('token');
// eslint-disable-next-line no-console
  // A token is present
  if (token) {
    // Token with a valid JWT format XXX.YYY.ZZZ
    if (token.split('.').length === 3) {
      // Could be a valid JWT or an access token with the same format
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const exp = JSON.parse(window.atob(base64)).exp;
        // JWT with an optonal expiration claims
        if (exp) {
          const isExpired = Math.round(new Date().getTime() / 1000) >= exp;
          if (isExpired) {
            // FAIL: Expired token
            return true;
          }
          // PASS: Non-expired token
          return false;
        }
      } catch (e) {
        // PASS: Non-JWT token that looks like JWT
        return true;
      }
    }
    // PASS: All other tokens
    return true;
  }
  // FAIL: No token at all
  return true;
}

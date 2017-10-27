import http from '../services/httpService';
import parseAxiosErrorResponseBody from '../utils/http-utils';

export default {
  login(credentials, cb, errorCb) {
    http.post('/authenticate_b2c', { email: credentials.login, password: credentials.password })
      .then(
// eslint-disable-next-line arrow-body-style
        (response) => {
          // eslint-disable-next-line
          /* http.interceptors.request.use(
            (config) => {
              // Do something before request is sent
// eslint-disable-next-line no-param-reassign
              config.headers.authorization = `Bearer ${response.data.token}`;
              return config;
            },
            error =>
              // Do something with request error
              Promise.reject(error),
          ); */
          return cb(response);
        },
        error => errorCb(parseAxiosErrorResponseBody(error)));
  },

  getProfile(id, cb, errorCb) {
    http.get(`/profile_b2c/${id}`)
      .then(response => cb(response), error => errorCb(parseAxiosErrorResponseBody(error)));
  },
};


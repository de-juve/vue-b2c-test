import axios from 'axios';
import { tokenIsExpired } from '../utils/jwtToken-utils';
import LocalStorageService from './localStorageService';


const instance = axios.create({
  baseURL: '/api',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
});

function issueToken() {
  return new Promise((resolve, reject) =>
      instance.get('/refresh_token_b2c',
        {
          headers: {
            authorization: `Bearer ${LocalStorageService.get('token')}`,
          },
        },
      ).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      }),
    err => Promise.reject(err),
  );
}

instance.interceptors.request.use((config) => {
    // Do something before request is sent
  const originalRequest = config;
  const token = LocalStorageService.get('token');

  if (!['login'].includes(window.location.pathname)) {
    if (token) {
      if (token && tokenIsExpired()) {
// eslint-disable-next-line no-shadow
        return issueToken().then(({ token }) => {
          originalRequest.headers.authorization = `Bearer ${token}`;
          return Promise.resolve(originalRequest);
        });
      }
    }
    originalRequest.headers.authorization = `Bearer ${LocalStorageService.get('token')}`;
    return Promise.resolve(originalRequest);
  }
  return config;
},
  error =>
    // Do something with request error
    Promise.reject(error),
);


export default instance;

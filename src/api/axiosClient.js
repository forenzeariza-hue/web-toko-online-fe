import axios from 'axios';

import {
  AUTH_UNAUTHORIZED_EVENT,
  clearAuth,
  getToken,
} from '../utils/authStorage.js';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const hadToken = Boolean(getToken());

    if (status === 401 && hadToken) {
      clearAuth();
      window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT));
    }

    return Promise.reject(error);
  }
);

export default axiosClient;

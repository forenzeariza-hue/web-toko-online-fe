import axiosClient from '../api/axiosClient.js';

export async function register({ nama, email, password }) {
  const response = await axiosClient.post('/auth/register', {
    nama,
    email,
    password,
  });
  return response.data.data;
}

export async function login({ email, password }) {
  const response = await axiosClient.post('/auth/login', { email, password });
  return response.data.data;
}

export async function getMe() {
  const response = await axiosClient.get('/auth/me');
  return response.data.data;
}

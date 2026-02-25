import api from './api';

export const registerUser = (data) => api.post('/register', data);
export const loginUser = (data) => api.post('/login', data);
export const logoutUser = (token) =>
  api.post('/logout', null, { headers: { Authorization: `Bearer ${token}` } });
export const getCurrentUser = (token) =>
  api.get('/user', { headers: { Authorization: `Bearer ${token}` } });

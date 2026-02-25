import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // adjust if deployed
  headers: {
    'Accept': 'application/json',
  },
});

// Attach token if available
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;

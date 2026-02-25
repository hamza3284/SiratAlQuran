import api from './api';

// Public endpoints
export const getAyats = () => api.get('/admin/ayats'); // Used in admin list
export const getAyatPublic = (id) => api.get(`/ayats/${id}`);

// Admin endpoints
export const getAyat = (id) => api.get(`/admin/ayats/${id}`);
export const createAyat = (data) => api.post('/admin/ayats', data);
export const updateAyat = (id, data) => api.put(`/admin/ayats/${id}`, data);
export const deleteAyat = (id) => api.delete(`/admin/ayats/${id}`);

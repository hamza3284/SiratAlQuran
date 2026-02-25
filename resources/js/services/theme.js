import api from './api';

// Public endpoints
export const getThemes = () => api.get('/themes');
export const getThemeAyats = (slug) => api.get(`/themes/${slug}/ayats`);
export const getExternalThemeAyats = (slug, page = 1) => api.get(`/themes/${slug}/external-ayats`, { params: { page } });

// Admin endpoints
export const getAdminThemes = () => api.get('/admin/themes');
export const getTheme = (id) => api.get(`/admin/themes/${id}`);
export const createTheme = (data) => api.post('/admin/themes', data);
export const updateTheme = (id, data) => api.put(`/admin/themes/${id}`, data);
export const deleteTheme = (id) => api.delete(`/admin/themes/${id}`);

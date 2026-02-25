import api from './api';

export const getJournal = (token) =>
  api.get('/journals', { headers: { Authorization: `Bearer ${token}` } });

export const createJournalEntry = (token, data) =>
  api.post('/journal', data, { headers: { Authorization: `Bearer ${token}` } });

export const saveJournalEntry = async (ayatId, reflection) => {
  // Uses api instance which already has token from AuthContext/setAuthToken
  const { data } = await api.post("/journal", {
    ayat_id: ayatId,
    reflection_text: reflection,
  });
  return data;
};

export const getJournalEntries = async () => {
  const { data } = await api.get("/journals");
  return data;
};

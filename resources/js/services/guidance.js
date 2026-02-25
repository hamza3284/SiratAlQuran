import api from "./api";

export const getGuidance = async (text) => {
  const { data } = await api.post("/guidance", { text });
  return data;
};

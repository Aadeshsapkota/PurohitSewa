import api from "./axios";

export const getDashboardStats = async () => {
  const { data } = await api.get("/admin/stats");
  return data;
};
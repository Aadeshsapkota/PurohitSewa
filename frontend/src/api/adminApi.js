import api from "./axios";

export const adminRegister = async (username, password) => {
  const { data } = await api.post("/admin/register", {
    username,
    password,
  });
  return data;
};

export const adminLogin = async (username, password) => {
  const { data } = await api.post("/admin/login", {
    username,
    password,
  });
  return data;
};

export const getDashboardStats = async () => {
  const { data } = await api.get("/admin/stats");
  return data;
};
import api from "./axios";

export const getBookings = async () => {
  const { data } = await api.get("/bookings");
  return data;
};

export const getBooking = async (id) => {
  const { data } = await api.get(`/bookings/${id}`);
  return data;
};

export const deleteBooking = async (id) => {
  const { data } = await api.delete(`/bookings/${id}`);
  return data;
};
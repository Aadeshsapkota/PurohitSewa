import React, { useState, useEffect } from "react";
import "./AdminBooking.css";
import { getBookings, deleteBooking } from "../../api/bookingApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const statusLabel = (status) => {
  if (!status) return "Pending";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export default function PoojaBookingAdmin() {
  const [bookings, setBookings] = useState([]);

  const updateStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };
const handleDelete = async (id) => {
  try {
    const data = await deleteBooking(id);

    if (data.success || data.message) {
      setBookings((prev) =>
        prev.filter((booking) => booking.id !== id)
      );

      toast.success("Booking cancelled successfully");
    }

  } catch (error) {
    console.error("Delete booking failed:", error);

    toast.error(
      error.response?.data?.message || "Failed to cancel booking"
    );
  }
};
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();

      if (data.success) {
        setBookings(
          data.bookings.map((booking) => ({
            ...booking,
            status: booking.status || "pending",
          }))
        );
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  return (
    <div className="page">
      <header className="header">
        <h1 className="header-title">Pooja Booking</h1>
      </header>

      <div className="container">
        <div className="grid">
          {bookings.map((booking) => (
            <div key={booking.id} className="card">
              <div className="card-top">
                <span className="pooja-name">{booking.poojaType}</span>
                <span className="om-symbol">{"\u0950"}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Customer:</span> {booking.userName}
              </div>
              <div className="detail-row">
                <span className="detail-label">Date:</span> {new Date(booking.poojaDate).toLocaleDateString()}
              </div>
              <div className="detail-row">
                <span className="detail-label">Time:</span> {booking.poojaTime}
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span> {booking.phoneNo}
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span> {booking.location}
              </div>

              <div className="status-row">
                <span className={`status ${booking.status || "pending"}`}>
                  {statusLabel(booking.status)}
                </span>

                <div className="btn-row">
                  <button
                    className="btn btn-confirm"
                    onClick={() => updateStatus(booking.id, "completed")}
                  >
                    Confirm
                  </button>
                  <button
  className="btn btn-cancel"
  onClick={() => handleDelete(booking.id)}
>
  Cancel
</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
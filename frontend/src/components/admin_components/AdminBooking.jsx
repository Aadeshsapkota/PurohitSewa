import React, { useState, useEffect } from "react";
import "./AdminBooking.css";
import { getBookings } from "../../api/bookingApi";


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
                    onClick={() => updateStatus(booking.id, "cancelled")}
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
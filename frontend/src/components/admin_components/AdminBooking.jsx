import React, { useState } from "react";
import "./AdminBooking.css";

const initialBookings = [
  {
    id: 1,
    poojaName: "Satyanarayan Pooja",
    customerName: "Ramesh Sharma",
    date: "05 Aug 2026",
    time: "10:00 AM",
    phone: "98XXXXXX21",
    location: "Baneshwor, Kathmandu",
    status: "incomplete",
  },
  {
    id: 2,
    poojaName: "Griha Pravesh Pooja",
    customerName: "Sita Koirala",
    date: "07 Aug 2026",
    time: "8:30 AM",
    phone: "98XXXXXX45",
    location: "Lalitpur",
    status: "completed",
  },
  {
    id: 3,
    poojaName: "Rudrabhishek",
    customerName: "Bikash Thapa",
    date: "09 Aug 2026",
    time: "6:00 AM",
    phone: "98XXXXXX67",
    location: "Bhaktapur",
    status: "incomplete",
  },
  {
    id: 4,
    poojaName: "Navratri Pooja",
    customerName: "Anita Gurung",
    date: "12 Aug 2026",
    time: "9:00 AM",
    phone: "98XXXXXX89",
    location: "Patan",
    status: "completed",
  },
  {
    id: 5,
    poojaName: "Ganesh Pooja",
    customerName: "Prakash Rai",
    date: "14 Aug 2026",
    time: "11:00 AM",
    phone: "98XXXXXX12",
    location: "Kirtipur",
    status: "incomplete",
  },
  {
    id: 6,
    poojaName: "Laxmi Pooja",
    customerName: "Kabita Shrestha",
    date: "16 Aug 2026",
    time: "7:00 PM",
    phone: "98XXXXXX34",
    location: "Boudha, Kathmandu",
    status: "cancelled",
  },
];

const statusLabel = (status) => status.charAt(0).toUpperCase() + status.slice(1);

export default function PoojaBookingAdmin() {
  const [bookings, setBookings] = useState(initialBookings);

  const updateStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
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
                <span className="pooja-name">{booking.poojaName}</span>
                <span className="om-symbol">{"\u0950"}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Customer:</span> {booking.customerName}
              </div>
              <div className="detail-row">
                <span className="detail-label">Date:</span> {booking.date}
              </div>
              <div className="detail-row">
                <span className="detail-label">Time:</span> {booking.time}
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span> {booking.phone}
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span> {booking.location}
              </div>

              <div className="status-row">
                <span className={`status ${booking.status}`}>
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
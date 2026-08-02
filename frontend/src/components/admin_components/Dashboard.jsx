import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  Clock,
  User,
  Bell,
  X,
  TrendingUp,
} from "lucide-react";
import axios from "axios";
import "./Dashboard.css";

const REMINDER_THRESHOLD_DAYS = 3;

function getDaysUntil(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);

  const diff = target - today;

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Dashboard() {
  const [stats, setStats] = useState({
    bookings: 0,
    recentBookings: [],
  });

  const [loading, setLoading] = useState(true);
  const [showReminders, setShowReminders] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/stats"
        );

        setStats(res.data);
         console.log(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const nearbyBookings = useMemo(() => {
    return stats.recentBookings
      .map((booking) => ({
        ...booking,
        daysUntil: getDaysUntil(booking.poojaDate),
      }))
      .filter(
        (booking) =>
          booking.daysUntil >= 0 &&
          booking.daysUntil <= REMINDER_THRESHOLD_DAYS
      )
      .sort((a, b) => a.daysUntil - b.daysUntil);
  }, [stats]);

  if (loading) {
    return (
      <div className="dashboard">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>

        <button
          className="reminder-btn"
          onClick={() => setShowReminders(true)}
        >
          <Bell size={20} />

          {nearbyBookings.length > 0 && (
            <span className="reminder-badge">
              {nearbyBookings.length}
            </span>
          )}
        </button>
      </div>

      <div className="dashboard-grid">

        {/* Total Bookings */}

        <div className="card total-booking-card">
          <div className="card-title">
            <TrendingUp size={18} />
            <span>Total Bookings</span>
          </div>

          <div className="total-count">
            {stats.bookings}
          </div>
        </div>

        {/* Recent Bookings */}

        <div className="card upcoming-card">
          <div className="card-title">
            <CalendarCheck size={18} />
            <span>Recent Bookings</span>
          </div>

          <div className="booking-list">
            {stats.recentBookings.length === 0 ? (
              <p className="empty-msg">
                No bookings found.
              </p>
            ) : (
              stats.recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="booking-row"
                >
                  <div className="booking-user">
                    <User size={15} />
                    <span>{booking.userName}</span>
                  </div>

                  <div className="booking-datetime">
                    <span className="booking-date">
                      {formatDate(booking.poojaDate)}
                    </span>

                    <span className="booking-time">
                      <Clock size={13} />
                      {booking.poojaTime}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Latest Booking */}

        <div className="card pooja-today-card">
          <div className="card-title">
            <CalendarCheck size={18} />
            <span>Latest Booking</span>
          </div>

          {stats.recentBookings.length === 0 ? (
            <p className="empty-msg">
              No booking available.
            </p>
          ) : (
            <>
              <h3>{stats.recentBookings[0].userName}</h3>

              <p>
                {stats.recentBookings[0].poojaType}
              </p>

              <p>
                {formatDate(stats.recentBookings[0].poojaDate)}
              </p>

              <p>
                {stats.recentBookings[0].poojaTime}
              </p>

              <p>
                {stats.recentBookings[0].location}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Reminder Modal */}

      {showReminders && (
        <div
          className="modal-overlay"
          onClick={() => setShowReminders(false)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Upcoming Reminders</h3>

              <button
                className="modal-close"
                onClick={() => setShowReminders(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              {nearbyBookings.length === 0 ? (
                <p className="empty-msg">
                  No upcoming bookings.
                </p>
              ) : (
                nearbyBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="reminder-row"
                  >
                    <div className="booking-user">
                      <User size={15} />
                      <span>{booking.userName}</span>
                    </div>

                    <div className="reminder-meta">
                      <span className="booking-date">
                        {formatDate(booking.poojaDate)}
                      </span>

                      <span className="booking-time">
                        <Clock size={13} />
                        {booking.poojaTime}
                      </span>

                      <span className="days-left">
                        {booking.daysUntil === 0
                          ? "Today"
                          : `In ${booking.daysUntil} day${
                              booking.daysUntil > 1 ? "s" : ""
                            }`}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
import React, { useState, useMemo } from 'react'
import {
    CalendarCheck,
    Clock,
    User,
    Bell,
    X,
    TrendingUp,
    CheckCircle2,
    Hourglass,
} from 'lucide-react'
import './Dashboard.css'

// Mock data — replace with API data later
const BOOKING_STATS = {
    total: 128,
    completed: 94,
    pending: 34,
}

const UPCOMING_BOOKINGS = [
    { id: 1, username: 'Ramesh Shrestha', date: '2026-07-24', time: '10:00 AM' },
    { id: 2, username: 'Sita Koirala', date: '2026-07-25', time: '2:30 PM' },
    { id: 3, username: 'Bikash Thapa', date: '2026-07-28', time: '9:00 AM' },
    { id: 4, username: 'Anita Gurung', date: '2026-08-02', time: '11:00 AM' },
]

const POOJA_TODAY = [
    { id: 1, username: 'Kamal Adhikari', callTime: '7:00 AM', pooja: 'Satyanarayan Pooja' },
    { id: 2, username: 'Sunita Rai', callTime: '12:00 PM', pooja: 'Griha Pravesh' },
]

// Days threshold for "nearby" reminders
const REMINDER_THRESHOLD_DAYS = 3

function getDaysUntil(dateStr) {
    const today = new Date('2026-07-22') // fixed "today" for consistent demo; use `new Date()` in production
    const target = new Date(dateStr)
    const diffTime = target.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)
    return Math.round(diffTime / (1000 * 60 * 60 * 24))
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

function Dashboard() {
    const [showReminders, setShowReminders] = useState(false)

    const nearbyBookings = useMemo(() => {
        return UPCOMING_BOOKINGS
            .map((b) => ({ ...b, daysUntil: getDaysUntil(b.date) }))
            .filter((b) => b.daysUntil >= 0 && b.daysUntil <= REMINDER_THRESHOLD_DAYS)
            .sort((a, b) => a.daysUntil - b.daysUntil)
    }, [])

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>Dashboard</h2>
                <button
                    className="reminder-btn"
                    onClick={() => setShowReminders(true)}
                    aria-label="View reminders"
                >
                    <Bell size={20} strokeWidth={1.75} />
                    {nearbyBookings.length > 0 && (
                        <span className="reminder-badge">{nearbyBookings.length}</span>
                    )}
                </button>
            </div>

            <div className="dashboard-grid">
                {/* 1. Total Booking Info */}
                <div className="card total-booking-card">
                    <div className="card-title">
                        <TrendingUp size={18} strokeWidth={1.75} />
                        <span>Total Bookings</span>
                    </div>
                    <div className="total-count">{BOOKING_STATS.total}</div>
                    <div className="stat-breakdown">
                        <div className="stat-item">
                            <CheckCircle2 size={16} className="stat-icon completed" />
                            <span>{BOOKING_STATS.completed} Completed</span>
                        </div>
                        <div className="stat-item">
                            <Hourglass size={16} className="stat-icon pending" />
                            <span>{BOOKING_STATS.pending} Pending</span>
                        </div>
                    </div>
                </div>

                {/* 2. Upcoming Bookings */}
                <div className="card upcoming-card">
                    <div className="card-title">
                        <CalendarCheck size={18} strokeWidth={1.75} />
                        <span>Upcoming Bookings</span>
                    </div>
                    <div className="booking-list">
                        {UPCOMING_BOOKINGS.map((b) => (
                            <div key={b.id} className="booking-row">
                                <div className="booking-user">
                                    <User size={15} strokeWidth={1.75} />
                                    <span>{b.username}</span>
                                </div>
                                <div className="booking-datetime">
                                    <span className="booking-date">{formatDate(b.date)}</span>
                                    <span className="booking-time">
                                        <Clock size={13} strokeWidth={1.75} />
                                        {b.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Pooja Today */}
                <div className="card pooja-today-card">
                    <div className="card-title">
                        <CalendarCheck size={18} strokeWidth={1.75} />
                        <span>Pooja Today</span>
                    </div>
                    {POOJA_TODAY.length === 0 ? (
                        <p className="empty-msg">No pooja scheduled for today.</p>
                    ) : (
                        <div className="booking-list">
                            {POOJA_TODAY.map((p) => (
                                <div key={p.id} className="booking-row">
                                    <div className="booking-user">
                                        <User size={15} strokeWidth={1.75} />
                                        <div className="pooja-info">
                                            <span>{p.username}</span>
                                            <span className="pooja-name">{p.pooja}</span>
                                        </div>
                                    </div>
                                    <div className="booking-datetime">
                                        <span className="booking-time">
                                            <Clock size={13} strokeWidth={1.75} />
                                            Calls at {p.callTime}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Reminders Popup */}
            {showReminders && (
                <div className="modal-overlay" onClick={() => setShowReminders(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Upcoming Reminders</h3>
                            <button
                                className="modal-close"
                                onClick={() => setShowReminders(false)}
                                aria-label="Close reminders"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <div className="modal-body">
                            {nearbyBookings.length === 0 ? (
                                <p className="empty-msg">No poojas coming up in the next {REMINDER_THRESHOLD_DAYS} days.</p>
                            ) : (
                                nearbyBookings.map((b) => (
                                    <div key={b.id} className="reminder-row">
                                        <div className="booking-user">
                                            <User size={15} strokeWidth={1.75} />
                                            <span>{b.username}</span>
                                        </div>
                                        <div className="reminder-meta">
                                            <span className="booking-date">{formatDate(b.date)}</span>
                                            <span className="booking-time">
                                                <Clock size={13} strokeWidth={1.75} />
                                                {b.time}
                                            </span>
                                            <span className={`days-left ${b.daysUntil === 0 ? 'today' : ''}`}>
                                                {b.daysUntil === 0 ? 'Today' : `In ${b.daysUntil} day${b.daysUntil > 1 ? 's' : ''}`}
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
    )
}

export default Dashboard
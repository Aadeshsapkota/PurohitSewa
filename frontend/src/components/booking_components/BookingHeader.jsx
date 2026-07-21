import React from 'react'
import './BookingHeader.css'
function BookingHeader() {
    return (
        <div>
            <div className="booking-header">
                <h1 className="booking-title">Book a Pooja</h1>
                <p className="booking-subtitle">
                    Fill in your details and we'll confirm your booking shortly.
                </p>
            </div>
        </div>
    )
}

export default BookingHeader
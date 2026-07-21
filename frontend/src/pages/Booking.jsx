import React, { useState } from "react";
import SuccessPannel from "../components/booking_components/SuccessPannel";
import BookingHeader from "../components/booking_components/BookingHeader";
import './Booking.css'
import BookingForm from "../components/booking_components/BookingForm";

export default function Booking() {
  const [isBooked, setIsBooked] = useState(false);
  return (
    <div className="booking-page">
      <div className="booking-card">
        {!isBooked ? (
          <>
            <BookingHeader/>
            <BookingForm/>
          </>
        ) : (
            <SuccessPannel/>
        )}
      </div>
    </div>
  );
}
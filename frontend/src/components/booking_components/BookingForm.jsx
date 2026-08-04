import React, { useState } from 'react';
import './BookingForm.css';
import axios from 'axios';
import { createBooking } from '../../api/bookingApi';
import { useNavigate } from "react-router-dom";

function BookingForm() {
    const [formData, setFormData] = useState({
        userName: "",
        poojaType: "",
        phoneNo: "",
        location: "",
        poojaDate: "",
        poojaTime: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isBooked, setIsBooked] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

   const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setIsSubmitting(true);

  try {
    const response = await createBooking(formData);


    if (response.success) {
      setIsBooked(true);
    } else {
      setError(response.message || "Booking failed.");
    }
  } catch (err) {
    console.error("Booking error:", err);

    setError(
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Something went wrong while booking. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
};

    // Show success message instead of the form
   if (isBooked) {
  return (
    <div className="booking-success">
      <div className="success-icon">✓</div>

      <h2>Booking Successful!</h2>

      <p>
        Your <strong>{formData.poojaType}</strong> booking has been
        successfully submitted.
      </p>

      <p>We will contact you soon for confirmation.</p>

      <button
        className="back-home-btn"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>
    </div>
  );
}

    return (
        <div>
             <div className="booking-header">
      <button
        type="button"
        className="back-home-btn"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>
    </div>
            <form className="booking-form" onSubmit={handleSubmit}>

                <div className="field">
                    <label htmlFor="username">Your Name</label>

                    <input
                        id="username"
                        name="userName"
                        type="text"
                        placeholder="Full name"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="field">
                    <select
                        name="poojaType"
                        className="poojaname"
                        value={formData.poojaType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a Pooja</option>
                        <option value="Shiva Pooja">Shiva Pooja</option>
                        <option value="Nwaran">Nwaran</option>
                        <option value="Satyanarayan Pooja">
                            Satyanarayan Pooja
                        </option>
                        <option value="Graha Shanti Pooja">
                            Graha Shanti Pooja
                        </option>
                        <option value="Shraddha">Shraddha</option>
                        <option value="Bibaha">Bibaha (Wedding)</option>
                        <option value="Pasni">Pasni</option>
                        <option value="Griha Vastu Pooja">
                            Griha Vastu Pooja
                        </option>
                        <option value="Rudri Pooja">Rudri Pooja</option>
                        <option value="Bratabandha">Bratabandha</option>
                        <option value="Ganesh Pooja">Ganesh Pooja</option>
                        <option value="Shilanyas Pooja">
                            Shilanyas Pooja
                        </option>
                        <option value="Sawari Sadhan Pooja">
                            Sawari Sadhan Pooja
                        </option>
                        <option value="Byabasaya Udghatan Pooja">
                            Byabasaya Udghatan Pooja
                        </option>
                    </select>
                </div>

                <div className="row-two">

                    <div className="field">
                        <label htmlFor="phone">Phone Number</label>

                        <input
                            id="phone"
                            name="phoneNo"
                            type="tel"
                            placeholder="Phone number"
                            value={formData.phoneNo}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="date">Date</label>

                        <input
                            id="date"
                            name="poojaDate"
                            type="date"
                            value={formData.poojaDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                </div>

                <div className="field">
                    <label htmlFor="location">Location</label>

                    <input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="Address or suburb"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="field">
                    <label htmlFor="time">Time</label>

                    <input
                        id="time"
                        name="poojaTime"
                        type="time"
                        value={formData.poojaTime}
                        onChange={handleChange}
                        required
                    />
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <button
                    className="submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Booking..." : "Book Pooja"}
                </button>
                
                

            </form>
        </div>
    );
}

export default BookingForm;


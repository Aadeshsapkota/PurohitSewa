import React, { useState } from 'react'
import './BookingForm.css'
import axios from 'axios';

function BookingForm() {
    const [formData, setFormData] = useState({
        customerName: "",
        poojaType: "",
        phoneNo: "",
        location: "",
        PoojaDate: "",
        poojaTime: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            const response = axios.post('http://localhost:3000/api/v1/bookings', formData);

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            setIsBooked(true);
        } catch (err) {
            setError("Something went wrong while booking. Please try again.");
            console.error("Booking error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <form className="booking-form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="username">Your Name</label>
                    <input
                        id="username"
                        name="customerName"
                        type="text"
                        placeholder="Full name"
                        value={formData.customerName}
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
                    >
                        <option value="">Select a Pooja</option>
                        <option value="Shiva Pooja">Shiva Pooja</option>
                        <option value="Nwaran">Nwaran</option>
                        <option value="Satyanarayan Pooja">Satyanarayan Pooja</option>
                        <option value="Graha Shanti Pooja">Graha Shanti Pooja</option>
                        <option value="Shraddha">Shraddha</option>
                        <option value="Bibaha">Bibaha (Wedding)</option>
                        <option value="Pasni">Pasni</option>
                        <option value="Griha Vastu Pooja">Griha Vastu Pooja</option>
                        <option value="Rudri Pooja">Rudri Pooja</option>
                        <option value="Bratabandha">Bratabandha</option>
                        <option value="Ganesh Pooja">Ganesh Pooja</option>
                        <option value="Shilanyas Pooja">Shilanyas Pooja</option>
                        <option value="Sawari Sadhan Pooja">Sawari Sadhan Pooja</option>
                        <option value="Byabasaya Udghatan Pooja">Byabasaya Udghatan Pooja</option>
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
                            name="PoojaDate"
                            type="date"
                            value={formData.PoojaDate}
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
                {error && <div className="error-message">{error}</div>}

                <button className="submit-btn" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Booking..." : "Book Pooja"}
                </button>
            </form>
        </div>
    )
}

export default BookingForm
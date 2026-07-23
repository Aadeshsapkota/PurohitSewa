import express from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
  deleteBooking,
} from "../controllers/booking.controller.js";

const router = express.Router();

// Create booking
router.post("/bookings", createBooking);

// Get all bookings
router.get("/bookings", getBookings);

// Get booking by ID
router.get("/bookings/:id", getBookingById);

// Delete booking
router.delete("/bookings/:id", deleteBooking);

export default router;
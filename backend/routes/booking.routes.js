import express from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
  deleteBooking,
} from "../controllers/booking.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

// Create booking
router.post("/bookings", createBooking);

// Get all bookings
router.get("/bookings",protect, isAdmin, getBookings);

// Get booking by ID
router.get("/bookings/:id", protect, isAdmin, getBookingById);

// Delete booking
router.delete("/bookings/:id",protect, isAdmin, deleteBooking);

export default router;
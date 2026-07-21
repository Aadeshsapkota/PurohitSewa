import express from "express";
import { createBooking, getBookings, deleteBooking ,getBookingById  } from "../controllers/booking.controller.js";
  import {isAdmin} from "../middleware/admin.middleware.js";
import {protect} from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/bookings", createBooking);
router.get("/bookings",protect,isAdmin, getBookings);
router.delete("/bookings/:id",protect,isAdmin, deleteBooking);
router.get("/bookings/:id",protect,isAdmin, getBookingById);
        
export default router;


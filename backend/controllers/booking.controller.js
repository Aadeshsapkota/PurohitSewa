import prisma from "../utils/prisma.js";
import { encrypt } from "../utils/encryption.js";

export const createBooking = async (req, res) => {
  try {
    const {
      userName,
      poojaType,
      location,
      phoneNo,
      poojaDate,
      poojaTime,
    } = req.body;

    if (
      !userName ||
      !poojaType ||
      !location ||
      !phoneNo ||
      !poojaDate ||
      !poojaTime
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    // Customer name validation
    if (userName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "userName  must be at least 2 characters.",
      });
    }

    // Phone number validation
    if (!/^\+?[0-9]{10,15}$/.test(phoneNo)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number.",
      });
    }

    // Date validation
    if (isNaN(Date.parse(poojaDate))) {
      return res.status(400).json({
        success: false,
        message: "Invalid pooja date.",
      });
    }

const lastBooking = await prisma.booking.findFirst({
  where: {
    userName,
  },
  orderBy: {
    createdAt: "desc",
  },
});

if (lastBooking) {
  const now = new Date();
  const lastTime = new Date(lastBooking.createdAt);

  const diff = now.getTime() - lastTime.getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  if (diff < oneDay) {
    return res.status(400).json({
      message:
        "You have already booked a Pooja. Please wait 24 hours before booking again, or contact the Guru for assistance.",
    });
  }
}

const booking = await prisma.booking.create({
  data: {
    userName,
    poojaType,
    location: encrypt(location),
    phoneNo: encrypt(phoneNo),
    poojaDate: new Date(poojaDate),
    poojaTime,
  },
});

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getBookings = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany();
        // Decrypt the location and phone number before sending the response
        const decryptedBookings = bookings.map(booking => ({
            ...booking,
            location: decrypt(booking.location),
            phoneNo: decrypt(booking.phoneNo)
        }));
        res.status(200).json(decryptedBookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};  


export const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await prisma.booking.findUnique({
            where: { id: parseInt(id) }
        });

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        // Decrypt the location and phone number before sending the response
        const decryptedBooking = {
            ...booking,
            location: decrypt(booking.location),
            phoneNo: decrypt(booking.phoneNo)
        };

        res.status(200).json(decryptedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await prisma.booking.delete({
            where: { id: parseInt(id) }
        });

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

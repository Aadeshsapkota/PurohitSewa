import prisma from "../utils/prisma.js";
import { encrypt, decrypt } from "../utils/encryption.js";
import { sendEmail } from "../utils/email.js";

export const createBooking = async (req, res) => {
  try {
    const userName = req.body.userName?.trim();
    const poojaType = req.body.poojaType?.trim();
    const location = req.body.location?.trim();
    const phoneNo = req.body.phoneNo?.trim();
    const poojaDate = req.body.poojaDate;
    const poojaTime = req.body.poojaTime?.trim();
    
    if (
      !userName ||
      !poojaType ||
      !location ||
      !phoneNo ||
      !poojaDate ||
      !poojaTime
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (userName.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Username must be at least 2 characters.",
      });
    }

    if (!/^\+?[0-9]{10,15}$/.test(phoneNo)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number.",
      });
    }

    if (isNaN(Date.parse(poojaDate))) {
      return res.status(400).json({
        success: false,
        message: "Invalid pooja date.",
      });
    }

    const lastBooking = await prisma.booking.findFirst({
      where: { userName },
      orderBy: { createdAt: "desc" },
    });

    if (lastBooking) {
      const diff = Date.now() - new Date(lastBooking.createdAt).getTime();

      if (diff < 24 * 60 * 60 * 1000) {
        return res.status(400).json({
          success: false,
          message:
            "You have already booked a Pooja. Please wait 24 hours before booking again.",
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

    // Return response immediately
    res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      booking,
    });

    // Send email in background
    sendEmail({
      userName,
      poojaType,
      location,
      phoneNo,
      poojaDate,
      poojaTime,
    }).catch((err) => {
      res.status(500).json({
message:"Internal Server Error"
});
    });

  } catch (error) {
    

    res.status(500).json({
message:"Internal Server Error"
});
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        poojaDate: "asc",
      },
    });

    const decryptedBookings = bookings.map((booking) => ({
      ...booking,
      location: decrypt(booking.location),
      phoneNo: decrypt(booking.phoneNo),
    }));

    return res.status(200).json({
      success: true,
      total: decryptedBookings.length,
      bookings: decryptedBookings,
    });
  } catch (error) {
    res.status(500).json({
message:"Internal Server Error"
});
  }
};



export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) }
    });

    if (!booking) {
      res.status(500).json({
message:"Booking not found."
});
    }

    // Decrypt the location and phone number before sending the response
    const decryptedBooking = {
      ...booking,
      location: decrypt(booking.location),
      phoneNo: decrypt(booking.phoneNo)
    };

    res.status(200).json(decryptedBooking);
  } catch (error) {
    res.status(500).json({
message:"Internal Server Error"
});
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
    res.status(500).json({
message:"Internal Server Error"
});
  }
};

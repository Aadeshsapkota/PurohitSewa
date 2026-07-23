import prisma from "../utils/prisma.js";
import { decrypt } from "../utils/encryption.js";
export const getStats = async (req, res) => {
  try {
    const bookings = await prisma.booking.count();

    const recentBookings = await prisma.booking.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        userName: true,
        poojaType: true,
        location: true,
        phoneNo: true

      },
    });

     const decryptedBookings = recentBookings.map((booking) => ({
      ...booking,
      location: decrypt(booking.location),
      phoneNo: decrypt(booking.phoneNo),
    }));


    return res.json({
      bookings,
      recentBookings:decryptedBookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
import prisma from "../utils/prisma.js"

export const getStats = async (req, res) =>{
    try{
        const bookings= await prisma.booking.count()
        

    }
 catch (err) {
    console.error(err);
    return res.status(500).json({
      message: error.message,
    });
  }
}

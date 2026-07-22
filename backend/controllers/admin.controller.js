import prisma from "../utils/prisma.js"

export const getStats = async (req, res) =>{
    try{
        const bookings= await prisma.booking.count()

        const recentBookings = await prisma.booking.findMany({
            take:5,
            orderBy: {
                createdAt:"desc",
            },
            include:{
                user:{
                    select:{
                    username:true,

                }
            }
        }
        

           
        });
        console.log(recentBookings)
         res.json({
            bookings,
            recentBookings     
            })
        

    }
 catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
}

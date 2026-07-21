import prisma from "../utils/prisma.js";
import { encrypt, decrypt } from "../utils/encryption.js";

export const createBooking = async (req, res) => {
    try{
        //date rakhna vulexau date pani rakha!!
        const {customerName, poojaType, location, phoneNo, poojaTime} = req.body;

        if(!customerName || !poojaType || !location || !phoneNo || !poojaTime){
            return res.status(400).json({error: "All fields are required"});
        }

                if (customerName.trim().length < 2) {
                return res.status(400).json({
                    success: false,
                    message: "Customer name must be at least 2 characters.",
                });
                }

            // Phone number (10–15 digits, optional +)
            if (!/^\+?[0-9]{10,15}$/.test(phoneNo)) {
            return res.status(400).json({
                success: false,
                message: "Invalid phone number.",
            });
            }

            // Date validation
            if (isNaN(Date.parse(poojaTime))) {
            return res.status(400).json({
                success: false,
                message: "Invalid pooja date and time.",
            });
            }
            //Naya Schema banayeww date pani add gara ani migrate gara hai doxt!!!1
        const booking = await prisma.booking.create({
            data: {
                customerName,
                poojaType,
                location: encrypt(location), // Encrypt the location before storing
                phoneNo: encrypt(phoneNo), // Encrypt the phone number before storing
                poojaTime
            }
        });
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
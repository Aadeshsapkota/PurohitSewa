import prisma from "../utils/prisma.js";
import { encrypt, decrypt } from "../utils/encryption.js";

export const createBooking = async (req, res) => {
    try{
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

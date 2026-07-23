import { sendEmail } from '../utils/email.js'


const sendEmailController = async (payload) => {
    try {

        await sendEmail(payload);
        return res.status(200).json({
            success: true,
            message: "Booking Info Sent to admin gmail"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const TestEmail = async (req, res) => {
    const payload = {
        userName: "aadesh",
        poojaTime: "12:40",
        poojaType: "rudri",
        location: "pokhara",
    }
    try {
        await sendEmail(payload);
        return res.status(200).json({
            success: true,
            message: "Booking is sent to the admin"
        })
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message: error,
        })
    }
}

    export { sendEmailController,TestEmail};
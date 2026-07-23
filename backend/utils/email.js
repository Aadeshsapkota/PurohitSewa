import { transporter } from '../config/smtp.config.js'

//send email service so that we can call it to send email form any part of our application
const sendEmail = async (payload) => {

    const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: "bibudon1121@gmail.com",
        subject: `A Client Booked ${payload.poojaType} - Purohit Sewa`,
        text: `Hello Admin,

A new booking has been made on Purohit Sewa. Here are the details:

Customer Name : ${payload.customerName}
Pooja Type     : ${payload.poojaType}
Pooja Time     : ${payload.poojaTime}
Location       : ${payload.location}

Please review and coordinate accordingly.

- Purohit Sewa System`,
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 500px;">
            <h2 style="color: #b8860b;">New Booking Notification</h2>
            <p>Hello Admin,</p>
            <p>A new booking has been made on <strong>Purohit Sewa</strong> by <strong>${payload.customerName}</strong> for a <strong>${payload.poojaType}</strong> pooja, scheduled at <strong>${payload.poojaTime}</strong> in <strong>${payload.location}</strong>.</p>
            <p style="margin-top: 20px;">Please review and coordinate accordingly.</p>
            <p>- Purohit Sewa System</p>
        </div>
    `,
        headers: {
            'X-Priority': '3',
            'X-MSMail-Priority': 'Normal',
            'Importance': 'Normal'
        }
    };
    //send email with the mailingoptions
    return await transporter.sendMail(mailOptions);
}

export { sendEmail };
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD,
    
  },
});


export const sendEmail = async (payload) => {
  const {
    userName,
    poojaType,
    location,
    phoneNo,
    poojaDate,
    poojaTime,
  } = payload;

  await transporter.sendMail({
  from: process.env.ADMIN_EMAIL,
  to: process.env.RECEIVER_EMAIL,
  subject: "🛕 New Pooja Booking Received",
  html: `
    <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;background:#f8f9fa;padding:30px;border-radius:10px;">

      <div style="text-align:center;padding-bottom:20px;border-bottom:2px solid #e5e5e5;">
        <h1 style="color:#d97706;margin:0;">🛕 Purohit Sewa</h1>
        <p style="color:#666;margin-top:8px;">A new booking has been received.</p>
      </div>

      <div style="background:#fff;padding:25px;border-radius:10px;margin-top:20px;box-shadow:0 2px 8px rgba(0,0,0,.08);">

        <p style="font-size:16px;">
          <strong>👤 Customer:</strong> ${userName}
        </p>

        <p style="font-size:16px;">
          <strong>🙏 Pooja Type:</strong> ${poojaType}
        </p>

        <p style="font-size:16px;">
          <strong>📅 Date:</strong> ${new Date(poojaDate).toLocaleDateString()}
        </p>

        <p style="font-size:16px;">
          <strong>🕒 Time:</strong> ${poojaTime}
        </p>

      </div>

      <div style="margin-top:25px;text-align:center;color:#888;font-size:13px;">
        <p>This email was generated automatically by <strong>Purohit Sewa</strong>.</p>
      </div>

    </div>
  `,
});

  
};

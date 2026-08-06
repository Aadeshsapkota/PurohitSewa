import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
});

export const sendEmail = ({
  userName,
  poojaType,
  location,
  phoneNo,
  poojaDate,
  poojaTime,
}) => {
  return transporter.sendMail({
    from: `"🛕 Purohit Sewa" <${process.env.ADMIN_EMAIL}>`,
    to: process.env.RECEIVER_EMAIL,
    subject: `🛕 New ${poojaType} Booking`,
    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>

<body style="margin:0;padding:30px;background:#f3f4f6;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.08);">

<tr>
<td style="background:#d97706;padding:30px;text-align:center;color:white;">
<h1 style="margin:0;">🛕 Purohit Sewa</h1>
<p style="margin-top:10px;">
New Booking Received
</p>
</td>
</tr>

<tr>
<td style="padding:35px;">

<p style="font-size:16px;color:#444;">
A new customer has submitted a booking.
</p>

<table width="100%" cellpadding="12" cellspacing="0" style="border-collapse:collapse;">

<tr style="background:#fafafa;">
<td><strong>👤 Customer</strong></td>
<td>${userName}</td>
</tr>

<tr>
<td><strong>🙏 Pooja</strong></td>
<td>${poojaType}</td>
</tr>

<tr style="background:#fafafa;">
<td><strong>📍 Location</strong></td>
<td>${location}</td>
</tr>

<tr>
<td><strong>📞 Phone</strong></td>
<td>${phoneNo}</td>
</tr>

<tr style="background:#fafafa;">
<td><strong>📅 Date</strong></td>
<td>${new Date(poojaDate).toLocaleDateString()}</td>
</tr>

<tr>
<td><strong>🕒 Time</strong></td>
<td>${poojaTime}</td>
</tr>

</table>

<div style="margin-top:35px;padding:18px;background:#fff7ed;border-left:5px solid #d97706;border-radius:6px;">
<b>Admin Action</b><br><br>
Please contact the customer as soon as possible to confirm this booking.
</div>

</td>
</tr>

<tr>
<td style="background:#f8f8f8;padding:25px;text-align:center;color:#777;font-size:13px;">

<b>Purohit Sewa</b><br>

This is an automated booking notification.<br>

© ${new Date().getFullYear()} Purohit Sewa. All rights reserved.

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`,
  });
};
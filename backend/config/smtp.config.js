import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import path from 'path'
import { fileURLToPath } from 'url'


// 2. Safely point to the .env file exactly two levels up
dotenv.config()

// 3. Creating transporter to reuse it for the entire project
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    // Convert string port to integer safely
    port: parseInt(process.env.SMTP_PORT || '587', 10), 
    // True for port 465, false for other ports like 587 or 25
    secure: process.env.SMTP_SECURE === 'true', 
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
})

// 4. Verify connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ SMTP Connection Error:', error.message);
    } else {
        console.log('🚀 SMTP Server is ready to deliver messages');
    }
});

export { transporter };

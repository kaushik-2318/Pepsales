import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (to, subject, message) => {
    try {

        const mailOptions = {
            from: "kaushikverma321@gmail.com",
            to,
            subject,
            text: message,
        };

        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error('Email sending failed:', error);
        if (error.code) {
            console.error(`Error code: ${error.code}`);
        }
        throw error; 
    }
};

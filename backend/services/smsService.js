import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

/**
 * Send SMS
 * @param {string} to - Recipient phone number
 * @param {string} message - SMS message content
 */
export const sendSMS = async (to, message) => {
    try {
        const response = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to,
        });

    } catch (error) {
        console.error(`Error sending SMS to ${to}:`, error.message);
    }
};

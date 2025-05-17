import Notification from '../models/Notification.js';

/**
 * Send In-App Notification
 * @param {string} userId - The recipient user ID
 * @param {string} message - The notification content
 */
export const sendInApp = async (userId, message) => {
    try {
        const notification = await Notification.create({
            userId,
            type: 'in-app',
            message,
            status: 'sent',
            read: false,
        });

        console.log(`In-App Notification sent to user ${userId}: ${message}`);
        return notification;
    } catch (error) {
        console.error('Error sending in-app notification:', error.message);
    }
};

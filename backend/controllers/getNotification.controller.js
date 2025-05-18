import Notification from '../models/Notification.js';

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find()
        const totalNotification = notifications.length
        const emailNotification = notifications.filter(notification => notification.type === 'email').length
        const smsNotification = notifications.filter(notification => notification.type === 'sms').length
        const inAppNotification = notifications.filter(notification => notification.type === 'in-app').length

        res.status(200).json({ totalNotification, emailNotification, smsNotification, inAppNotification });
    } catch (error) {
        console.error('Error fetching notifications:', error.message);
        res.status(500).json({ error: error.message });
    }
};

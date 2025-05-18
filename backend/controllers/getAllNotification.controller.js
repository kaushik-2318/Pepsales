import Notification from '../models/Notification.js';

export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find()
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error.message);
        res.status(500).json({ error: error.message });
    }
};

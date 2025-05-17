import Notification from '../models/Notification.js';
import { getChannel } from '../config/rabbitmq.js';

export const sendNotification = async (req, res) => {
    try {
        const { userId, type, message } = req.body;
        const notification = await Notification.create({ userId, type, message });

        const channel = getChannel();
        channel.sendToQueue('notifications', Buffer.from(JSON.stringify(notification)));

        res.status(200).json({ success: true, notification });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.id });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

import Notification from '../models/Notification.js';
import { getChannel } from '../config/rabbitmq.js';

export const sendNotification = async (req, res) => {
    try {
        const { userId, type, message } = req.body;


        if (!userId || !type || !message) {
            return res.status(400).json({ success: false, error: "All fields are requireds" });
        }

        const notification = await Notification.create({ userId, type, message });

        const channel = getChannel();
        channel.sendToQueue("notifications", Buffer.from(JSON.stringify(notification)));

        res.status(200).json({ success: true, notification });
    } catch (error) {
        console.error("Controller Error:", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export const getUserNotifications = async (req, res) => {
    try {
        const { id } = req.params;

        const notifications = await Notification.find({ userId: id })
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error.message);
        res.status(500).json({ error: error.message });
    }
};

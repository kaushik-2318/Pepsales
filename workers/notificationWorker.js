import { getChannel } from '../config/rabbitmq.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';
import { sendEmail } from '../services/emailService.js';
import { sendSMS } from '../services/smsService.js';
import { sendInApp } from '../services/inAppService.js';

const processNotification = async (msg) => {
    const notification = JSON.parse(msg.content.toString());
    console.log('Processing Notification:', notification);

    try {
        const user = await User.findById(notification.userId);

        if (!user) {
            console.error(`User not found for ID: ${notification.userId}`);
            getChannel().ack(msg);
            return;
        }

        switch (notification.type) {
            case 'email':
                await sendEmail(user.email, 'Notification', notification.message);
                break;

            case 'sms':
                await sendSMS(user.phone, notification.message);
                break;


            case 'in-app':
                await sendInApp(notification.userId, notification.message);
                break;

            default:
                console.log('Unknown notification type');
                throw new Error('Unknown notification type');
        }

        // Update the status to "sent"
        await Notification.findByIdAndUpdate(notification._id, { status: 'sent' });
        console.log(`Notification ${notification._id} marked as sent.`);

        getChannel().ack(msg);

    } catch (err) {
        console.error(`Error processing notification ${notification._id}:`, err.message);
        getChannel().nack(msg, false, false);
    }
};

export const startWorker = async () => {
    const channel = getChannel();
    await channel.assertQueue('notifications', { durable: true });

    console.log('Worker waiting for messages...');
    channel.consume('notifications', (msg) => {
        if (msg !== null) {
            processNotification(msg);
        }
    });
};

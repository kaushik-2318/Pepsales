import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['email', 'sms', 'in-app'],
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
    },
    read: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Notification', notificationSchema);

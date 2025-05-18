import express from 'express';
import { sendNotification, getUserNotifications } from '../controllers/notification.controller.js';
import { getNotifications } from '../controllers/getNotification.controller.js';
import { getAllNotifications } from '../controllers/getAllNotification.controller.js';

const router = express.Router();

router.post('/notifications', sendNotification);
router.get('/users/:id/notifications', getUserNotifications);
router.get('/getNotifications', getNotifications);
router.get('/getAllNotification', getAllNotifications);

export default router;

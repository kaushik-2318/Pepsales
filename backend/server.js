import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db.js';
import connectRabbitMQ from './config/rabbitmq.js';
import notificationRoutes from './routes/notificationRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { startWorker } from './workers/notificationWorker.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors())

app.use('/api/notification', notificationRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;

connectDB();
connectRabbitMQ().then(startWorker);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

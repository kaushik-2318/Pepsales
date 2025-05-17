import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import connectRabbitMQ from './config/rabbitmq.js';
import notificationRoutes from './routes/notificationRoutes.js';
import { startWorker } from './workers/notificationWorker.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', notificationRoutes);

const PORT = process.env.PORT || 5000;

connectDB();
connectRabbitMQ().then(startWorker);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

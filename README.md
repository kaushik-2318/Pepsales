
# PepSales Notification System

A full-stack application for managing and delivering notifications via Email, SMS, and In-App channels.

## Project Structure

- **Backend:** Node.js microservice with MongoDB and RabbitMQ
- **Frontend:** React application built with Vite and Tailwind CSS

## Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB (local or Docker)
- RabbitMQ (local or Docker)
- Docker & Docker Compose (optional, for containerized setup)

### Backend Setup

1. Navigate to the backend directory:

```
cd backend
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file with the following variables:

```
RABBITMQ_URI=amqp://guest:guest@localhost:5672/
MONGO_URI=mongodb://localhost:27017/notificationDB
PORT=5000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_MAIL=your-email@example.com
EMAIL_PASS=your-password
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-sid
TWILIO_PHONE_NUMBER=your-twilio-phone
```

4. Start the backend:

```
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:

```
cd frontend
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev
```

### Docker Setup

To run the entire application using Docker:

1. From the project root, create a `docker-compose.yml` file:

```yaml
version: '3'
services:
  mongodb:
    image: mongo:6
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: password
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      PORT: 5000
      MONGO_URI: mongodb://root:password@mongodb:27017/notifications?authSource=admin
      RABBITMQ_URI: amqp://rabbitmq
    depends_on:
      - mongodb
      - rabbitmq

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      VITE_API_URL: http://backend:5000
    depends_on:
      - backend

volumes:
  mongo_data:
```

2. Create a `Dockerfile` in the frontend directory:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

3. From the project root:

```
docker-compose up
```

This will start MongoDB, RabbitMQ, the backend API, and the frontend application.

## Backend Routes

### Notification Routes

```javascript
import express from 'express';
import { sendNotification, getUserNotifications } from '../controllers/notification.controller.js';
import { getNotifications } from '../controllers/getNotification.controller.js';
import { getAllNotifications } from '../controllers/getAllNotification.controller.js';

const router = express.Router();

router.post('/api/notifications', sendNotification);
router.get('/api/users/:id/notifications', getUserNotifications);
router.get('/api/getNotifications', getNotifications);
router.get('/api/getAllNotification', getAllNotifications);

export default router;
```

### User Routes

```javascript
import express from 'express';
import { getUserId } from '../controllers/getAllUserId.controller.js';
import { createUser } from '../controllers/createUser.controller.js';

const router = express.Router();

router.get('/api/getAllUserId', getUserId);
router.post('/api/createUser', createUser);

export default router;
```

## API Endpoints

- `POST /api/notification/notifications`: Create a new notification
- `GET /api/notification/users/:id/notifications`: Retrieve user notifications
- `GET /api/notification/getAllNotification`: Retrieve all notifications
- `GET /api/notification/getNotifications`: Retrieve notification statistics
- `GET /api/user/getAllUserId`: Retrieve all user IDs
- `POST /api/user/createUser`: Create a new user


## Assumptions

- **Environment:** The application assumes a development environment with access to required ports.
- **Authentication:** The current implementation does not include authentication.
- **Email/SMS Delivery:** The system is configured to use Nodemailer for email and Twilio for SMS.
- **Frontend-Backend Communication:** The frontend expects the backend to be running on `http://localhost:5000`.
- **Browser Compatibility:** The frontend is designed for modern browsers with CSS Grid and Flexbox support.

## Technologies Used

- **Backend:** Node.js, Express, MongoDB, Mongoose, RabbitMQ, Nodemailer, Twilio
- **Frontend:** React 19, Vite, Tailwind CSS, Radix UI, React Router, Axios, Recharts
- **DevOps:** Docker, Docker Compose

## License

ISC

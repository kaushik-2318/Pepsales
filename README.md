# PepSales Notification Service (Node.js)

A Node.js microservice for managing and delivering notifications via Email, SMS, and In-App channels. It leverages MongoDB for storage and RabbitMQ for asynchronous message processing.

---

## Features

- REST API for creating and retrieving notifications  
- Asynchronous notification delivery using RabbitMQ  
- Supports Email, SMS, and In-App notifications  
- Worker process for background notification processing  
- Dockerized for easy deployment  

---

## Project Structure

- `server.js` — Entry point and API setup  
- `controllers/notificationController.js` — Notification API logic  
- `workers/notificationWorker.js` — Background worker for processing notifications  

---

## Getting Started

### Prerequisites

- Node.js 18+  
- MongoDB (local or Docker)  
- RabbitMQ (local or Docker)  
- Docker & Docker Compose (optional, for containerized setup)  

### Installation

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd <repo-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with necessary environment variables (e.g., MongoDB URI, RabbitMQ URL, email credentials).

---

## Running the Application

### With Docker

Start all services (MongoDB, RabbitMQ, app, and worker):

```bash
docker-compose up
```

### Manually

1. Start MongoDB and RabbitMQ locally.  
2. Run the app:

   ```bash
   npm start
   ```

3. Run the worker process in a separate terminal:

   ```bash
   node workers/notificationWorker.js
   ```

---

## API Endpoints

### POST `/api/notifications`

Create a new notification.

**Request Body:**

```json
{
  "userId": "string",
  "type": "Email|SMS|In-App",
  "message": "string"
}
```

### GET `/api/users/:id/notifications`

Retrieve all notifications for a user.

---

## Technologies Used

- Node.js, Express  
- MongoDB, Mongoose  
- RabbitMQ, amqplib  
- Nodemailer  
- Docker, Docker Compose  

---

## License

ISC

---

For more details, check the source files:

- `server.js`  
- `controllers/notificationController.js`  
- `workers/notificationWorker.js`

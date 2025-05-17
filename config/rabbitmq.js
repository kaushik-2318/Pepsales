import amqp from 'amqplib';

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI);
        channel = await connection.createChannel();
        await channel.assertQueue('notifications', {
            durable: true,
        });

        console.log('Connected to RabbitMQ and queue "notifications" is ready');
    } catch (error) {
        console.error('RabbitMQ connection error:', error);
        process.exit(1);
    }
};

export const getChannel = () => channel;
export default connectRabbitMQ;


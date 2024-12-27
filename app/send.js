import amqp from 'amqplib';

const publishMessage = async () => {
  const exchange = 'logs';
  const message = 'Hello, subscribers!';

  try {

    const connection = await amqp.connect('amqp://localhost:5173');
    const channel = await connection.createChannel();

 
    await channel.assertExchange(exchange, 'fanout', { durable: false });


    channel.publish(exchange, '', Buffer.from(message));
    console.log(`Message published: ${message}`);

    
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error publishing message:', error);
  }
};

publishMessage();

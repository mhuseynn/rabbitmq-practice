import amqp from 'amqplib';

const subscribeToMessages = async () => {
  const exchange = 'logs';

  try {

    const connection = await amqp.connect('amqp://localhost:5173');
    const channel = await connection.createChannel();

    
    await channel.assertExchange(exchange, 'fanout', { durable: false });

  
    const { queue } = await channel.assertQueue('', { exclusive: true });

    await channel.bindQueue(queue, exchange, '');

    console.log(`Waiting for messages in queue: ${queue}`);

 
    channel.consume(queue, (msg) => {
      if (msg.content) {
        console.log(`Received message: ${msg.content.toString()}`);
      }
    }, { noAck: true });
  } catch (error) {
    console.error('Error subscribing to messages:', error);
  }
};

subscribeToMessages();

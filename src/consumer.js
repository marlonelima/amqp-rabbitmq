const AMQP = require('./amqp');

async function consumer() {
  const amqp = new AMQP();
  await amqp.connect();
  await amqp.prefetch(4);

  const options = {
    exchange: 'messages',
    queueName: 'vip-users',
    routingKey: 'vip.1'
  }

  amqp.consume(options, (msg) => {
    console.log(msg.content.toString());
    amqp.channel.ackAll();
  });
}

consumer();

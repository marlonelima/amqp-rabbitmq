const amqp = require('amqplib/callback_api');
const { username, password } = require('./configs/config');

amqp.connect({ username, password }, function (error1, connection) {
  connection.createChannel((error2, channel) => {

    channel.assertExchange('users-messages', 'direct', {
      durable: false,
    });

    channel.assertQueue('', { exclusive: true }, function (error3, q) {
      channel.bindQueue(q.queue, 'users-messages', 'consumer-1');

      channel.consume(q.queue, function (msg) {
        console.log(msg.fields.routingKey, msg.content.toString());
      });
    });

    console.log('Now listening to messages');
  })
});
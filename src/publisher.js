const readline = require('readline');
const amqp = require('amqplib/callback_api');
const { username, password } = require('./configs/config');

// creating connection in rabbitmq
let amqpChannel = null;

amqp.connect({ username, password }, function (error1, connection) {
  connection.createChannel((error2, channel) => {
    amqpChannel = channel;

    channel.assertExchange('users-messages', 'direct', {
      durable: false
    });
  });
});

// setting command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  amqpChannel.publish('users-messages', 'consumer-1', Buffer.from(line))
});

console.log('Type something and press enter to publish');

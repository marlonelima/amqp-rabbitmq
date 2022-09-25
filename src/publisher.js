const readline = require('readline');
const AMQP = require('./amqp');

async function publisher() {
  const amqp = new AMQP();
  await amqp.connect();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  rl.on('line', (line) => {
    const options = {
      exchange: 'messages',
      routingKey: 'vip.1',
      message: line
    };

    amqp.publish(options);
  });
}

publisher();

console.log('Type something and press enter to publish');

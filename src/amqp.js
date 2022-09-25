const amqp = require('amqplib');

class AMQP {
  connection = undefined;
  channel = undefined;

  async connect() {
    this.connection = await amqp.connect({
      username: 'root',
      password: 'root'
    });

    this.channel = await this.connection.createChannel();
  }

  prefetch(number) {
    this.channel.prefetch(number);
  }

  consume({ exchange, queueName, routingKey }, callback) {
    this.channel.assertExchange(exchange, 'direct', { durable: false });
    this.channel.assertQueue(queueName);
    this.channel.bindQueue(queueName, exchange, routingKey);

    this.channel.consume(queueName, callback);
  }

  publish({ exchange, routingKey, message }) {
    this.channel.publish(exchange, routingKey, Buffer.from(message));
  }

  ackAll() {
    this.channel.ackAll();
  }
}

module.exports = AMQP;

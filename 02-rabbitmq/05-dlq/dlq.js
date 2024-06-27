const ampq = require("amqplib");

async function start() {
  const connection = await ampq.connect("amqp://localhost");
  // puerto por defecto 5672
  const channel = await connection.createChannel();

  // especificar el intercambiador
  const exchange = "exchange-dlq";
  await channel.assertExchange(exchange, "direct", { durable: true });

  const routingKey = "dlq-error"; // el ruotingKey del consumidor debe ser igual

  const queueName = "queueDlq";

  await channel.assertQueue(queueName);

  // conectar cola con intercambiador

  await channel.bindQueue(queueName, exchange, routingKey);

  channel.consume(queueName,data=> {
    console.log(data.content.toString());

    channel.ack(data, true);
  }, {
    noAck: false
  })
}

start();

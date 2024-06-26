const ampq = require("amqplib");
const args = process.argv.slice(2);

async function start() {
  const connection = await ampq.connect("amqp://localhost");
  // puerto por defecto 5672
  const channel = await connection.createChannel();

  // especificar el intercambiador
  const exchange = "exchange-topic";

  // vincular el intercambiador
  await channel.assertExchange(exchange, "topic", { durable: true });
  // conectar consumidor con la cola
  const assertQueue = await channel.assertQueue("", { exclusive: true });
  // el mensaje solo esa cola lo ve

  const routingKey = args.length > 0 ? args : ["key"];

  // crear una lista de binding para tener multiples routingKey

  const listBindigs = [];

  for (const key of routingKey) {
    listBindigs.push(channel.bindQueue(assertQueue.name, exchange, key));
  }

  // consumir mensaje
  await Promise.all(listBindigs);
  channel.consume(
    assertQueue.queue,
    data => {
      console.log(data.content.toString());
    },
    {
      noAck: false
    }
  );
}

start();

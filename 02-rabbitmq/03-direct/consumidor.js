const ampq = require("amqplib");
const args = process.argv.slice(2);

async function start() {
  const connection = await ampq.connect("amqp://localhost");
  // puerto por defecto 5672
  const channel = await connection.createChannel();

  // especificar el intercambiador
  const exchange = "exchange-direct";

  // vincular el intercambiador
  await channel.assertExchange(exchange, "direct", { durable: true });
  // conectar consumidor con la cola
  const assertQueue = await channel.assertQueue("", { exclusive: true });
  // el mensaje solo esa cola lo ve

  const routingKey = args.length > 0 ? args[0] : "key";
  
  // vincular cola con intercambiador
  channel.bindQueue(assertQueue.queue, exchange, routingKey);

  // consumir mensaje

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

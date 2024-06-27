const ampq = require("amqplib");
const args = process.argv.slice(2);

async function start() {
  const connection = await ampq.connect("amqp://localhost");
  // puerto por defecto 5672
  const channel = await connection.createChannel();

  // especificar el intercambiador
  const exchange = "exchange-direct";
  await channel.assertExchange(exchange, "direct", { durable: true });
  // conectar consumidor con la cola

  const exchangeDQL = "exchange-dlq";
  await channel.assertExchange(exchangeDQL, "direct", { durable: true });

  const assertQueue = await channel.assertQueue("", {
    exclusive: true,
    deadLetterExchange: exchangeDQL,
    deadLetterRoutingKey: "dlq-error" // conecta con la cola donde se van a enviar los mensajes de error
  });
  // el mensaje solo esa cola lo ve

  const routingKey = args.length > 0 ? args[0] : "key";
  await channel.bindQueue(assertQueue.queue, exchange, routingKey);

  // consumir mensaje
  channel.consume(
    assertQueue.queue,
    data => {
      console.log(data.content.toString());
      const message = data.content.toString();
      console.log({message})
      if (message && message === "default") {
        channel.reject(data, false); // se confirma que dio error el mensaje
      } else {
        channel.ack(data, true); // se confirma que se procesa el mensaje
      }
    },
    {
      noAck: false // no procesar automaticamente el mensaje
    }
  );
}

start();

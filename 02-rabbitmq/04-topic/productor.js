const ampq = require("amqplib");
const args = process.argv.slice(2);

async function start() {
  const connection = await ampq.connect("amqp://localhost");
  // puerto por defecto 5672
  const channel = await connection.createChannel();

  // especificar el intercambiador
  const exchange = "exchange-topic";

  // crear el intercambiador
  await channel.assertExchange(exchange, "topic", { durable: true });

  const message = args.length === 0 ? "Message by default" : args[0];
  const routingKey = args.length > 1 ? args[1] : "key";
  console.log({message, routingKey});

  //publicar el mensaje al intercambiador
  channel.publish(exchange, routingKey, Buffer.from(message));

  setTimeout(() => {
    connection.close();
    process.exit(1);
  }, 2000);
}

start();
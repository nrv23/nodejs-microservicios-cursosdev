const ampq = require("amqplib");
const args = process.argv.slice(2);

async function start() {
  const connection = await ampq.connect("amqp://localhost");
  // puerto por defecto 5672
  const channel = await connection.createChannel();

  // especificar el intercambiador
  const exchange = "exchange-fanout";

  // vincular el intercambiador
  await channel.assertExchange(exchange, "fanout", { durable: true });

  const message = args.length === 0 ? "Message by default" : args[0];

  //publicar el mensaje al intercambiador 
  await channel.publish(exchange,'',Buffer.from(message));

  setTimeout(() => {
    connection.close();
    process.exit(1);
  }, 2000);
}

start();

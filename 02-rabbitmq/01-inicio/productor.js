const ampq = require("amqplib");
const args = process.argv.slice(2);

async function start() {
  const connection = await ampq.connect("amqp://localhost");
  // puerto por defecto 5672
  const channel = await connection.createChannel();
  const queueName = "Cola01";
  // crear cola y asignarle el nombre
  await channel.assertQueue(queueName, {
    durable: true
  }); // si el servicio se reinicia, la cola no se pierde con los mensajes

  const message = args.length > 0 ? args[0] : "message by default";
  // envia el mensaje y debe enviarse el contenido como un buffer
  channel.sendToQueue(queueName, Buffer.from(message));
}


start();
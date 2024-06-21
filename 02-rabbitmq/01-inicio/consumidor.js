const ampq = require("amqplib");

async function start() {
  const connection = await ampq.connect("amqp://localhost");
  // puerto por defecto 5672
  const channel = await connection.createChannel();
  const queueName = "Cola01";
  await channel.assertQueue(queueName, {
    durable: true
  },{
    noAck: true
  });

  // aqui se consume el mensaje

  channel.consume(queueName, data => { // el callback viene en formato buffer
    if(data !== null) {
      console.log(data.content.toString());
      channel.ack(data)
    }
  })
}

start();

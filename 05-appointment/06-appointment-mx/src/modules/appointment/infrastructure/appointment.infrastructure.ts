import { Parameter } from '../../../core/parameter';
import { RabbitmqBootstrap } from '../../../bootstrap/rabbitmq.bootstrap';
import { Appointment } from '../domain/appointment';
import { AppointmentRepository } from '../domain/repositories/appointment.repository';
import { ok, Result } from 'neverthrow';
import { MysqlBootstrap } from '../../../bootstrap/mysql.bootstrap';
import { AppointmentDto } from './dto/appointment.dto';


export interface ExchangeOptions {
  durable: boolean;
}

export type AppointmentResult = Result<Appointment, Error>;

export class AppointmentInfrastrcuture implements AppointmentRepository {

  async receive(consumer: ((message: any) => void)): Promise<void> {
    const channel = RabbitmqBootstrap.channel;
    const exchangeName = Parameter.exchange_name;
    const exchangeType = Parameter.exchange_type;
    const exchangeOptions: ExchangeOptions = { durable: true };
    const routingkey = Parameter.exchange_routing_key; // indica a cual cola se envia por país
    const exhchangeNameDlq = Parameter.exchange_name_dlq;
    const exchangeRoutingKeyDlq = Parameter.exchange_routing_key_dlq;
    
    // crear intercambiador 
    await channel.assertExchange(exchangeName, exchangeType, exchangeOptions);

    // mensajes fallidos 
    await channel.assertExchange(exhchangeNameDlq, exchangeType, exchangeOptions);

    // crea la cola 
    const queue = await channel.assertQueue("", { exclusive: true, 
      deadLetterExchange: exhchangeNameDlq, 
      deadLetterRoutingKey: exchangeRoutingKeyDlq 
     });
    // exclusive indica qye solo va escuchar mensajes de este intercambiador

    // unir cola con intercambiador
    await channel.bindQueue(queue.queue, exchangeName, routingkey);

    // consumir el mensaje
    await channel.consume(queue.queue, consumer, { noAck: false });
    // noAck: false no confirmar mensajes automaticamente

  }



  async sendToQueueMessageConfirm(id: string, state: string) {

    const channel = RabbitmqBootstrap.channel;
    const exchangeName = Parameter.exchange_name;
    const exchangeType = Parameter.exchange_type;
    const exchangeOptions: ExchangeOptions = { durable: true };
    const routingkey = Parameter.exchange_routing_key_message_confirmed;

    //setear la cola
    channel.assertExchange(exchangeName, exchangeType, exchangeOptions);
    // publicar mensajes en la cola
    channel.publish(exchangeName, routingkey, Buffer.from(JSON.stringify({ id, state })));
  }

}
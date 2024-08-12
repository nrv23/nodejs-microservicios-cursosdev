import { Parameter } from '../../../core/parameter';
import { RabbitmqBootstrap } from '../../../bootstrap/rabbitmq.bootstrap';
import { Appointment } from '../domain/appointment';
import { AppointmentRepository } from '../domain/repositories/appointment.repository';
import { err, ok, Result } from 'neverthrow';
import { MysqlBootstrap } from '../../../bootstrap/mysql.bootstrap';
import { AppointmentDto } from './dto/appointment.dto';
import { AppointmentEntity } from './entities/appointment.entity';


export interface ExchangeOptions {
  durable: boolean;
}

export type AppointmentResult = Result<Appointment, Error>;

export class AppointmentInfrastrcuture implements AppointmentRepository {

  async save(appointment: Appointment){

    try {
      const repository = MysqlBootstrap.dataSource.getRepository(AppointmentEntity);
      await repository.save(AppointmentDto.fromDomainToEntity(appointment));
      return ok(appointment);
    } catch (error) {
      console.log({error});
      const errObj = new Error("Error saving appointment "+ JSON.stringify({error}));
      return err(errObj);
    }
  }

  async receive(consumer: ((message: any) => void)): Promise<void> {
    const channel = RabbitmqBootstrap.channel;
    const exchangeName = Parameter.exchange_name_dlq;
    const exchangeType = Parameter.exchange_type;
    const exchangeOptions: ExchangeOptions = { durable: true };
    const routingkey = Parameter.exchange_routing_key_dlq; // indica a cual cola se envia por país

    //cola de intentos fallidos
     await channel.assertExchange(exchangeName, exchangeType, exchangeOptions);
    // crea la cola 
    const queue = await channel.assertQueue("", { exclusive: true});
    // exclusive indica qye solo va escuchar mensajes de este intercambiador

    // unir cola con intercambiador
    await channel.bindQueue(queue.queue, exchangeName, routingkey);

    // consumir el mensaje
    await channel.consume(queue.queue, consumer, { noAck: false });
    // noAck: false no confirmar mensajes automaticamente
  }
}
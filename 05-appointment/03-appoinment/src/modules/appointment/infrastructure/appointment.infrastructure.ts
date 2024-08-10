import { Parameter } from '../../../core/parameter';
import { RabbitmqBootstrap } from '../../../bootstrap/rabbitmq.bootstrap';
import { Appointment } from '../domain/appointment';
import { AppointmentRepository } from '../domain/repositories/appointment.repository';
import { ok, Result } from 'neverthrow';
import { MysqlBootstrap } from '../../../bootstrap/mysql.bootstrap';
import { AppointmentDto } from './dto/appointment.dto';
import { AppointmentEntity } from './entities/appointment.entity';

export interface ExchangeOptions {
  durable: boolean;
}

export type AppointmentResult = Result<Appointment, Error>;

export class AppointmentInfrastrcuture implements AppointmentRepository {
  async save(appointment: Appointment): Promise<AppointmentResult> {

    //guardar en bd la cita 
    await this.saveAppointmentToDb(appointment);
    // enviar datos a la cola
    await this.sendToQueue(appointment);


    return Promise.resolve(ok(appointment));
  }
  async receiveMeesageConfirmed(consumer: ((message: any) => void)): Promise<void> {

    const channel = RabbitmqBootstrap.channel;
    const exchangeName = Parameter.exchange_name;
    const exchangeType = Parameter.exchange_type;
    const exchangeOptions: ExchangeOptions = { durable: true };
    const routingkey = Parameter.exchange_routing_key_message_confirmed;

    // crear intercambiador 
    await channel.assertExchange(exchangeName, exchangeType, exchangeOptions);

    // crea la cola 
    const queue = await channel.assertQueue("", { exclusive: true });
    // exclusive indica qye solo va escuchar mensajes de este intercambiador

    // unir cola con intercambiador
    await channel.bindQueue(queue.queue, exchangeName, routingkey);

    // consumir el mensaje
    await channel.consume(queue.queue, consumer, { noAck: false });
    // noAck: false no confirmar mensajes automaticamente
  }

  async saveAppointmentToDb(appointment: Appointment) {
    const appointmentEntity = AppointmentDto.fromDomainToEntity(appointment);
    await MysqlBootstrap.dataSource.getRepository(AppointmentEntity).save(appointmentEntity)
  }

  private async sendToQueue(appointment: Appointment) {

    const channel = RabbitmqBootstrap.channel;
    const exchangeName = Parameter.exchange_name;
    const exchangeType = Parameter.exchange_type;
    const exchangeOptions: ExchangeOptions = { durable: true };
    const routingkey = appointment.properties.isoCountryCode; // indica a cual cola se envia por país

    //setear la cola
    channel.assertExchange(exchangeName, exchangeType, exchangeOptions);
    // publicar mensajes en la cola
    channel.publish(exchangeName, routingkey, Buffer.from(JSON.stringify(appointment.properties)));
  }

  async findById(id: string): Promise<AppointmentResult> {
    const repository = await MysqlBootstrap.dataSource.getRepository(AppointmentEntity);
    const appointment = await repository.findOne({
      where: { id }
    });


    return Promise.resolve(ok(AppointmentDto.fromDataToDomain(appointment)));
  }

}
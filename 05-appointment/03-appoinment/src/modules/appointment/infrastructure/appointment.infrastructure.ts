import { Parameter } from '../../../core/parameter';
import { RabbitmqBootstrap } from '../../../bootstrap/rabbitmq.bootstrap';
import { Appointment } from '../domain/appointment';
import { AppointmentRepository } from '../domain/repositories/appointment.repository';
import { ok, Result } from 'neverthrow';

export interface ExchangeOptions {
  durable: boolean;
}

export type AppointmentResult = Result<Appointment, Error>;

export class AppointmentInfrastrcuture implements AppointmentRepository {
  save(appointment: Appointment): Promise<AppointmentResult> {

    const channel = RabbitmqBootstrap.channel;
    const exchangeName = Parameter.exchange_name;
    const exchangeType = Parameter.exchange_type;
    const exchangeOptions: ExchangeOptions = { durable: true };
    const routingkey = appointment.properties.isoCountryCode; // indica a cual cola se envia por país

    //setear la cola
    channel.assertExchange(exchangeName, exchangeType, exchangeOptions);

    // publicar mensajes en la cola
    channel.publish(exchangeName, routingkey,Buffer.from(JSON.stringify(appointment.properties)));

    return Promise.resolve(ok(appointment));
  }
  receive(consumer: ((message: any) => void)): Promise<void> {
    throw new Error('Method not implemented.');
  }

}
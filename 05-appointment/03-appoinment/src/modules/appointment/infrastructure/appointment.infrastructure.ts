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

    // enviar datos a la cola
    await this.sendToQueue(appointment);
    //guardar en bd la cita 
    await this.saveAppointmentToDb(appointment);
    
    return Promise.resolve(ok(appointment));
  }
  receive(consumer: ((message: any) => void)): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private async saveAppointmentToDb(appointment: Appointment) {
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
    channel.publish(exchangeName, routingkey,Buffer.from(JSON.stringify(appointment.properties)));
  }

}
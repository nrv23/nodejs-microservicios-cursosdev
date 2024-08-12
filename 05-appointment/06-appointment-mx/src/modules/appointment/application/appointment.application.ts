import { AppointmentRepository } from '../domain/repositories/appointment.repository';
import { Appointment } from '../domain/appointment';
import { RabbitmqBootstrap } from '../../../bootstrap/rabbitmq.bootstrap';

export class AppointmentApplication {

  constructor(private readonly repository: AppointmentRepository) {
    this.consumer = this.consumer.bind(this);
  }

  async consumer(message: any) {
    try {
      if (message !== null) {
        console.log(message.content.toString());
        const { id } = JSON.parse(message.content.toString());
        console.log("mensaje confirmado")
        RabbitmqBootstrap.channel.reject(message, false);
        await this.repository.sendToQueueMessageConfirm(id, 'ERROR');
      }
    } catch (error) {
      console.log({ error })
    }
  }

  async receive() {
    await this.repository.receive(this.consumer);
  }
}
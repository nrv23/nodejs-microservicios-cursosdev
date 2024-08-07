import { AppointmentRepository } from '../domain/repositories/appointment.repository';
import { Appointment } from '../domain/appointment';
import { RabbitmqBootstrap } from '../../../bootstrap/rabbitmq.bootstrap';



export class AppointmentApplication {

  constructor(private readonly repository: AppointmentRepository) {
    this.consumer = this.consumer.bind(this);
  }

  consumer(message: any) {
    console.log(message.content.toString());
    const { id } = JSON.parse(message.content.toString());
    setTimeout(async () => {
      console.log("mensaje confirmado")
        RabbitmqBootstrap.channel.ack(message);
        await this.repository.sendToQueueMessageConfirm(id,'CONFIRMED');
    }, 5000);
  }

  async receive() {
      await this.repository.receive(this.consumer);
  }
}
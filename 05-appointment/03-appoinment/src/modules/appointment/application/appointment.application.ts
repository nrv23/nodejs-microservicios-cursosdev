import { AppointmentRepository } from '../domain/repositories/appointment.repository';
import { Appointment } from '../domain/appointment';
import { RabbitmqBootstrap } from '../../../bootstrap/rabbitmq.bootstrap';



export class AppointmentApplication {

  constructor(private readonly repository: AppointmentRepository) {
    this.consumer = this.consumer.bind(this);
  }

  async save(appointment: Appointment) {
    return await this.repository.save(appointment);
  }

  async consumer(message: any) {

    try {

      if(message !== null) {
        console.log("mensaje de vuelta ", message.content.toString());
        const { id, state } = JSON.parse(message.content.toString());
        const foundResult = await this.repository.findById(id);
        if (foundResult.isErr()) return;
        const appointment = foundResult.value;
        appointment.update(state);
        await this.repository.saveAppointmentToDb(appointment);
        
        RabbitmqBootstrap.channel.ack(message);
        console.log("La cita ha sido confirmada");
      }
    } catch (error) {
      console.log({error});
      RabbitmqBootstrap.channel.nack(message,false,false);
    }
  }

  async receiveMessageConfirmed() {
    await this.repository.receiveMeesageConfirmed(this.consumer);
  }
}
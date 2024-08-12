import { AppointmentRepository } from "../domain/repositories/appointment.repository";
import { Appointment, AppointmentProps } from "../domain/appointment";
import { RabbitmqBootstrap } from "../../../bootstrap/rabbitmq.bootstrap";
import { AppointmentEntity } from "../infrastructure/entities/appointment.entity";

export class AppointmentApplication {
  constructor(private readonly repository: AppointmentRepository) {
    this.consumer = this.consumer.bind(this);
  }

  async consumer(message: any) {
    try {
      if (message !== null) {
        const {
          id,
          name,
          email,
          date,
          medicId,
          specialtyId,
          centerId,
          isoCountryCode,
          state,
          createAt,
          lastname
        } = JSON.parse(message.content.toString());

        console.log("mensaje recibido", {
          id,
          name,
          email,
          date,
          medicId,
          specialtyId,
          centerId,
          isoCountryCode,
          state,
          lastname,
          createAt
        });
        //console.log("mensaje confirmado")
       

        const props: AppointmentProps = {
          name: name,
          lastname: lastname,
          email: email,
          date: date,
          medicId: medicId,
          specialtyId: specialtyId,
          centerId: centerId,
          isoCountryCode: isoCountryCode,
          state: state,
          createAt: new Date(createAt)
        };
        const appointment = new Appointment(props);
        await this.repository.save(appointment);
        RabbitmqBootstrap.channel.ack(message);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  async receive() {
    await this.repository.receive(this.consumer);
  }
}

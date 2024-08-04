import { AppointmentRepository } from '../domain/repositories/appointment.repository';
import { Appointment } from '../domain/appointment';



export class AppointmentApplication {

  constructor(private readonly repository: AppointmentRepository) {

  }

  async save(appointment: Appointment) {
    return await this.repository.save(appointment);
  }

  receive() {

  }
}
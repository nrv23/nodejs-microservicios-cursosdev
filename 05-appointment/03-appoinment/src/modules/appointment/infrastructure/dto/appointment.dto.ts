import { Appointment } from "../../domain/appointment";
import { AppointmentEntity } from '../entities/appointment.entity';



export class AppointmentDto {



    static fromDomainToEntity(appointment: Appointment) : AppointmentEntity {

        const entity = new AppointmentEntity();

        entity.name = appointment.properties.name;
        entity.id = appointment.properties.id;
        entity.lastname = appointment.properties.lastname;
        entity.email = appointment.properties.email;
        entity.date = new Date(Date.parse(appointment.properties.date));
        entity.medicId = appointment.properties.medicId;
        entity.centerId = appointment.properties.centerId;
        entity.specialtyId = appointment.properties.specialtyId;
        entity.isoCountryCode = appointment.properties.isoCountryCode;
        entity.state = appointment.properties.state;
        entity.createdAt = appointment.properties.createAt;
        
        return entity;

    }

    static fromDataToDomain(appointment: AppointmentEntity): Appointment {
        const appointmentProps = {
            id: appointment.id,
            name: appointment.name,
            lastname: appointment.lastname,
            email: appointment.email,
            date: appointment.date.toISOString(),
            medicId: appointment.medicId,
            specialtyId: appointment.specialtyId,
            centerId: appointment.centerId,
            isoCountryCode: appointment.isoCountryCode,
            state: appointment.state,
            createdAt: appointment.createdAt,
            updatedAt: appointment.updatedAt,
        }

        return new Appointment(appointmentProps)
    }
}
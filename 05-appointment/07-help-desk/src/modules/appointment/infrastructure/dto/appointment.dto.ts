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
        entity.state = "ERROR";
        entity.createdAt = new Date();
        
        return entity;

    }
}
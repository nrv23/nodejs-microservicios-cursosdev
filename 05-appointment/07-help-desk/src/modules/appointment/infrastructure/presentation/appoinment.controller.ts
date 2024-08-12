import { AppointmentApplication } from "../../application/appointment.application";


export class AppointmentController {

    constructor(
        private readonly application: AppointmentApplication
    ) {}

    listen = async () => {
        await this.application.receive()
    }
}
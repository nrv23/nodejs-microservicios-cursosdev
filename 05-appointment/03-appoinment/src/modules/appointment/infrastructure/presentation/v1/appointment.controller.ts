import { NextFunction, Request, Response } from "express";
import { AppointmentApplication } from "../../../../appointment/application/appointment.application";
import { Appointment } from "../../../../appointment/domain/appointment";


export class AppointmentController {
  constructor(private application: AppointmentApplication) {

  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      lastname,
      email,
      date,
      medicId,
      specialtyId,
      centerId,
      isoCountryCode
    } = req.body;

    const appointment = new Appointment({
      name,
      lastname,
      email,
      date,
      medicId,
      specialtyId,
      centerId,
      isoCountryCode
    });

    const response = await this.application.save(appointment);

    if(response.isErr()) return res.status(500).json({
      message: response.error.message
    })

    return res.status(200).json({
      response
    })
  }

  receive = async () => {
    this.application.receiveMessageConfirmed();
  }
}
import { Router } from "express";

import { AppointmentApplication } from "../../../application/appointment.application";
import { AppointmentInfrastrcuture } from "../../appointment.infrastructure";
import { AppointmentRepository } from "../../../../appointment/domain/repositories/appointment.repository";
import { AppointmentController } from "./appointment.controller";

const repository: AppointmentRepository = new AppointmentInfrastrcuture();
const application = new AppointmentApplication(repository);
const controller = new AppointmentController(application);

class AppointmentRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  addRoutes() {
    this.router.post("/", controller.create);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default new AppointmentRoutes().getRouter();

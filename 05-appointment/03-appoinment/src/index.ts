import dotenv from "dotenv";

import app from "./app";
import { MysqlBootstrap } from "./bootstrap/mysql.bootstrap";
import { RabbitmqBootstrap } from "./bootstrap/rabbitmq.bootstrap";
import { RedisBootstrap } from "./bootstrap/redis.bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";
import { AppointmentRepository } from "./modules/appointment/domain/repositories/appointment.repository";
import { AppointmentController } from "./modules/appointment/infrastructure/presentation/v1/appointment.controller";
import { AppointmentInfrastrcuture } from "./modules/appointment/infrastructure/appointment.infrastructure";
import { AppointmentApplication } from "./modules/appointment/application/appointment.application";

dotenv.config();
const serverBootstrap = new ServerBootstrap(app);
const mysqlBootstrap = new MysqlBootstrap();
const rabbitmqBootstrap = new RabbitmqBootstrap();
const redisBootstrap = new RedisBootstrap();


const repository : AppointmentRepository = new AppointmentInfrastrcuture();
const application = new AppointmentApplication(repository);
const controller = new AppointmentController(application);
(async () => {
  try {
    const listPromises = [];
    listPromises.push(serverBootstrap.init());
    listPromises.push(mysqlBootstrap.init());
    listPromises.push(rabbitmqBootstrap.init());
    listPromises.push(redisBootstrap.init());

    await Promise.all(listPromises);
    await controller.receive();
    console.log("Servers initialized");
  } catch (error) {
    console.log(error);
    serverBootstrap.close();
    mysqlBootstrap.close();
    rabbitmqBootstrap.close();
    redisBootstrap.close();
  }
})();

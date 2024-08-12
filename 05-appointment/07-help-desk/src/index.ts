import dotenv from "dotenv";

import app from "./app";
import { MysqlBootstrap } from "./bootstrap/mysql.bootstrap";
import { RabbitmqBootstrap } from "./bootstrap/rabbitmq.bootstrap";
import { RedisBootstrap } from "./bootstrap/redis.bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";
import { AppointmentController } from "./modules/appointment/infrastructure/presentation/appoinment.controller";
import { AppointmentApplication } from "./modules/appointment/application/appointment.application";
import { AppointmentRepository } from "./modules/appointment/domain/repositories/appointment.repository";
import { AppointmentInfrastrcuture } from "./modules/appointment/infrastructure/appointment.infrastructure";

dotenv.config();
const serverBootstrap = new ServerBootstrap(app);
const mysqlBootstrap = new MysqlBootstrap();
const rabbitmqBootstrap = new RabbitmqBootstrap();//
const redisBootstrap = new RedisBootstrap();

const repo: AppointmentRepository = new AppointmentInfrastrcuture();
const application = new AppointmentApplication(repo);
const controller = new AppointmentController(application);

(async () => {
  try {
    const listPromises = [];
    listPromises.push(serverBootstrap.init());
    listPromises.push(rabbitmqBootstrap.init());
    listPromises.push(mysqlBootstrap.init());
    listPromises.push(redisBootstrap.init());

    await Promise.all(listPromises);

    await controller.listen();

    console.log("Servers initialized");
  } catch (error) {
    console.log(error);
    serverBootstrap.close();
    rabbitmqBootstrap.close();
    redisBootstrap.close();
  }
})();

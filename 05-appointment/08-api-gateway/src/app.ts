import express, { Application } from "express";
import APIRoutes from "./modules/infraestructure/presentation/api.routes";

class App {
  private readonly expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.handleMiddlewares();
    this.handleRoutes();
    this.handleHealthcheck();
  }

  handleMiddlewares() {
    this.expressApp.use(express.json());
  }

  handleRoutes() {
    this.expressApp.use("/api", APIRoutes);
  }

  handleHealthcheck() {
    this.expressApp.get("/healthcheck", (request, response) => {
      response.status(200).json({ status: "ok" });
    });
  }

  getApp(): Application {
    return this.expressApp;
  }
}

export default new App().getApp();

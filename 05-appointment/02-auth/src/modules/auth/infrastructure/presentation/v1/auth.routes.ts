import { Router } from "express";

import { BcryptService } from "../../../../../core/application/service/bcrypt.service";
import { AuthInfrastructure } from "../../auth.infrastructure";
import { AuthRepository } from "./../../../../auth/domain/repositories/auth.repository";
import { HttpClientService } from "../../../../../core/application/service/http-client.service";
import { AuthApplication } from "./../../../../auth/application/auth.application";
import { JwtService } from "../../../../../core/application/service/jwt.service";
import { AuthController } from "./auth.controller";

const httpClientService: HttpClientService = new HttpClientService()
const bcryptService: BcryptService = new BcryptService();
const jwtService: JwtService = new JwtService()
const repository: AuthRepository = new AuthInfrastructure(httpClientService);
const application = new AuthApplication(repository, bcryptService, jwtService);
const controller = new AuthController(application);

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  addRoutes() {
    this.router.post("/login", controller.login);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default new AuthRoutes().getRouter();

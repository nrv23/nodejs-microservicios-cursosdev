import { Router } from "express";

import { UserApplication } from "../../../application/user.application";
import { UserRepository } from "../../../domain/repositories/auth.repository";
import { UserInfrastructure } from "../../auth.infrastructure";
import { UserController } from "./user.controller";
import { BcryptService } from "../../../../../core/application/service/bcrypt.service";

const bcryptService: BcryptService = new BcryptService();
const repository: UserRepository = new UserInfrastructure();
const application = new UserApplication(repository, bcryptService);
const controller = new UserController(application);

class UserRoute {
  private router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  addRoutes() {
    this.router.post("/", controller.insert);
    this.router.get("/", controller.get);

    /**
     * @openapi
     * /product/v1:
     *  get:
     *   tags:
     *    - Product
     *   responses:
     *    200:
     *      description: Get all products
     *    500:
     *      description: Internal server error
     *      content:
     *        application/json:
     *          schema:
     *           $ref: '#/components/schemas/Error'
     */
    this.router.get("/page", controller.getByPage);
    this.router.get("/:id", controller.getById);
    this.router.put("/:id", controller.update);
    this.router.delete("/:id", controller.delete);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default new UserRoute().getRouter();

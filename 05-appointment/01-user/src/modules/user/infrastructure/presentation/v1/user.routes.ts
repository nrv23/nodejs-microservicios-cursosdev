import { Router } from "express";

import { UserApplication } from "../../../application/user.application";
import { UserRepository } from "../../../domain/repositories/user";
import { UserInfrastructure } from "../../user.infrastructure";
import { UserController } from "./user.controller";

const repository: UserRepository = new UserInfrastructure();
const application = new UserApplication(repository);
const controller = new UserController(application);

class UserRoute {
  private router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  addRoutes() {
    this.router.post("/", controller.insert.bind(controller));
    this.router.get("/", controller.get.bind(controller));

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
    this.router.get("/page", controller.getByPage.bind(controller));
    this.router.get("/:id", controller.getById.bind(controller));
    this.router.put("/:id", controller.update.bind(controller));
    this.router.delete("/:id", controller.delete.bind(controller));
  }

  getRouter(): Router {
    return this.router;
  }
}

export default new UserRoute().getRouter();

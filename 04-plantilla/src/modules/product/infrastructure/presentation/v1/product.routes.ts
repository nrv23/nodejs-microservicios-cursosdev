import { Router } from "express";

import { ProductApplication } from "../../../application/product.application";
import { ProductRepository } from "../../../domain/repositories/product";
import { ProductInfrastructure } from "../../product.infrastructure";
import { ProductController } from "./product.controller";

const repository: ProductRepository = new ProductInfrastructure();
const application = new ProductApplication(repository);
const controller = new ProductController(application);

class ProductRoute {
  private router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  addRoutes() {
    this.router.post("/", controller.insert.bind(controller));
    this.router.get("/", controller.get.bind(controller));

    /**
     * @swagger
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

export default new ProductRoute().getRouter();

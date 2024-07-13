import { Router } from "express";
import { ProductController } from "./product.controller";
import { ProductApplication } from "../../application/product.application";
import { ProductInfra } from "../product.infra";
import { ProductRepository } from "../../domain/repositories/product.repository";

const repository: ProductRepository = new ProductInfra();
const application = new ProductApplication(repository);
const controller = new ProductController(application);

class ProductRoute {
    private router: Router;

    constructor() {
        this.router = Router();
        this.addRoutes();
    }

    addRoutes() {
        this.router.post("/", controller.insert);
    }


    getRouter() {
        return this.router;
    }
}

export default new ProductRoute().getRouter();
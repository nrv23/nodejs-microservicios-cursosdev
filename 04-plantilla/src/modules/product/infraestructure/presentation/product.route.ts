import { Router } from "express";
import { ProductController } from "./product.controller";
import { ProductApplication } from "../../application/product.application";
import { ProductInfra } from "../product.infra";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { MysqlBootstrap } from "../../../../bootstrap/mysql.bootstrap";
import { Parameter } from "../../../../core/parameter";

const parameter = new Parameter()
const mysqlBootstrap = new MysqlBootstrap(parameter)
const repository: ProductRepository = new ProductInfra(mysqlBootstrap);
console.log({repository})
const application = new ProductApplication(repository);
console.log({application})

const controller = new ProductController(application);

class ProductRoute {
    private router: Router;

    constructor() {
        this.router = Router();
        this.addRoutes();
    }

    addRoutes() {
        this.router.post("/", controller.insert);
        this.router.get("/", controller.find);
        this.router.get("/:id", controller.findById);
    }


    getRouter() {
        return this.router;
    }
}

export default new ProductRoute().getRouter();
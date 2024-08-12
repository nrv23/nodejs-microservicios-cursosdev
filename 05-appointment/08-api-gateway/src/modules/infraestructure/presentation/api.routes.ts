import { Router } from "express";
import { APIRepository } from '../../domain/repository/api.repository';
import { APIInfraestructure } from '../api.infraestructure';
import { APIApplication } from '../../application/api.application';
import { APIController } from './api.controller';

const repository: APIRepository = new APIInfraestructure();
const application = new APIApplication(repository);
const { appointment } = new APIController(application);

class APIRoutes {

    private readonly router: Router;

    constructor() {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes() {
        this.router.get("/", (req,res) => {
            res.send("Hola");
        });

        this.router.post("/appointment",appointment)
    }

    getRouter() {
        return this.router;
    }

}

export default new APIRoutes().getRouter();
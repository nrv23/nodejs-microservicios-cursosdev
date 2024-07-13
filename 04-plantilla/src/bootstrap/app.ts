import express, { Application, Request, Response } from "express";
import ProductRoutes from "../modules/product/infraestructure/presentation/product.route";

 class App {
    private readonly expressApp: Application;

    constructor() {
        this.expressApp = express(); // inicializa una aplicacion de express
        this.handleMiddlewares();
        this.handleRouter();
    }

    handleRouter() {
        this.expressApp.use("/product",ProductRoutes);
    }

    handleMiddlewares() {
        this.expressApp.get("/healthcheck", (req: Request, res: Response) => {
            return res.json({ ok: true });
        });

        this.expressApp.use(express.json());
    }

    // obtener la instancia de express 

    getApp(): Application {

        return this.expressApp;
    }
}

export default new App().getApp();
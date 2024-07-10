import express, { Application, Request, Response } from "express";

 class App {
    private readonly expressApp: Application;

    constructor() {
        this.expressApp = express(); // inicializa una aplicacion de express
        this.handleMiddlewares();
    }

    handleMiddlewares() {
        this.expressApp.get("/healthcheck", (req: Request, res: Response) => {
            return res.json({ ok: true });
        });
    }

    // obtener la instancia de express 

    getApp(): Application {

        return this.expressApp;
    }
}

export default new App().getApp();
import { log } from "console";
import { BootstrapReturn, IBootstrap } from "./bootstrap.interface";
import http from 'http';
import { Application } from "express";
import { Parameter } from "../core/parameter";
export class Server implements IBootstrap {
    private app: Application;
    private parameter: Parameter;
    constructor(app: Application, param: Parameter) {
        this.app = app;
        this.parameter = param;
    }

    init(): Promise<BootstrapReturn> {
        return new Promise((resolve,reject) => {
            const port = this.parameter.port;
            const server = http.createServer(this.app);
            server.listen(port).on("listening",() => { // evento que se ejecuta cuando el servidor esta escuchando
                log(`Servidor escuchado en puerto ${port}` );

                resolve(true);
            })
            .on("error", error => {
                log("hubo un error al escuchar peticiones en el servidor ", JSON.stringify({error}) );
                reject(error);
            })

        });
    }

    close() {
        process.exit(0); // termina el proceso de ejecucion del servidor de Node
    }
}
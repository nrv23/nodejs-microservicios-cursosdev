import { log } from "console";
import { IBootstrap } from "./bootstrap.interface";
import http from 'http';
export class Server implements IBootstrap {
    init(): Promise<boolean | string> {
        return new Promise((resolve,reject) => {
            const port = process.env.PORT || 3000;
            const server = http.createServer((request, response) => {
                response.end("Hola mundo");
            });

            server.listen(port).on("listening",() => { // evento que se ejecuta cuando el servidor esta escuchando
                log(`Servidor escuchado en puerto ${port}` );

                resolve(true);
            })
            .on("error", error => {
                log("hubo un error al escuchar peticiones en el servidor ", JSON.stringify({error}) );
                reject(error.message);
            })

        });
    }

    close() {
        process.exit(0); // termina el proceso de ejecucion del servidor de Node
    }
}
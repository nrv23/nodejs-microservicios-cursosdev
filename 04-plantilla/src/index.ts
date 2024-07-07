import { Server } from "./bootstrap/server.bootstrap";

const server = new Server();

(async ()=>{
    try {
        await server.init()
    } catch (error) {
        server.close();
    }
}) ()
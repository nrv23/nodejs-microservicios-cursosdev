import dotenv from "dotenv";
import app from "./bootstrap/app";
import { Server } from "./bootstrap/server.bootstrap";
import { Parameter } from "./core/parameter";
import { MysqlBootstrap } from "./bootstrap/mysql.bootstrap";
import { log } from "console";
import { RabbitmqBootstrap } from "./bootstrap/rabbitmq.bootstrap";

dotenv.config();
const params = new Parameter();
const server = new Server(app, params);
const mysqlBoostrap = new MysqlBootstrap(params);
const rabbitmqBootstrap = new RabbitmqBootstrap(params);

(async ()=>{

    try {        
        const promiseArray = [];
        promiseArray.push(server.init());
        promiseArray.push(mysqlBoostrap.init());
        promiseArray.push(rabbitmqBootstrap.init());
        
        await Promise.all(promiseArray);
        log("Mysql server started");
    } catch (error) {
        console.log({error});
        server.close();
        mysqlBoostrap.close();
        await rabbitmqBootstrap.close()
    }
}) ()
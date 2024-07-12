import dotenv from "dotenv";
import app from "./bootstrap/app";
import { Server } from "./bootstrap/server.bootstrap";
import { Parameter } from "./core/parameter";
import { MysqlBootstrap } from "./bootstrap/mysql.bootstrap";
import { log } from "console";
import { RabbitmqBootstrap } from "./bootstrap/rabbitmq.bootstrap";
import { RedisBootStrap } from "./bootstrap/redis.bootstrap";

dotenv.config();
const params = new Parameter();
const server = new Server(app, params);
const mysqlBoostrap = new MysqlBootstrap(params);
const rabbitmqBootstrap = new RabbitmqBootstrap(params);
const redisBootstrap = new RedisBootStrap(params);

(async ()=>{

    try {        
        const promiseArray = [];
        promiseArray.push(server.init());
        promiseArray.push(mysqlBoostrap.init());
        promiseArray.push(rabbitmqBootstrap.init());
        promiseArray.push(redisBootstrap.init());

        await Promise.all(promiseArray);
        log("Mysql server started");
    } catch (error) {
        console.log({error});
        server.close();
        mysqlBoostrap.close();
        rabbitmqBootstrap.close();
        redisBootstrap.close();
    }
}) ()
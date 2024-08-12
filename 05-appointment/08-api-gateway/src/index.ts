import dotenv from "dotenv";

import app from "./app";
import { RedisBootstrap } from "./bootstrap/redis.bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";

dotenv.config();
const serverBootstrap = new ServerBootstrap(app);
const redisBootstrap = new RedisBootstrap();

(async () => {
  try {
    const listPromises = [];
    listPromises.push(serverBootstrap.init());
    listPromises.push(redisBootstrap.init());
    await Promise.all(listPromises);
    console.log("Servers initialized");
  } catch (error) {
    console.log(error);
    serverBootstrap.close();
    redisBootstrap.close();
  }
})();

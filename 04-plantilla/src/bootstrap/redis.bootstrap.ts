import { Parameter } from '../core/parameter';
import { BootstrapReturn, IBootstrap } from './bootstrap.interface';
import IORedis from 'ioredis';
export class RedisBootStrap implements IBootstrap {

    private redisClient!: IORedis;
    constructor(private readonly params: Parameter) {

    }

    async init(): Promise<BootstrapReturn> {
        return new Promise((resolve, reject) => {

            const redisConfig = this.params.redisConfig;
            this.redisClient = new IORedis(redisConfig);

            this.redisClient
                .on("connect", () => {

                    console.log("Redis client connected");
                    resolve(true);
                })
                .on("error", error => {
                    console.log({error})
                    reject(error);
                })
        })
    }

    close() {
        console.log("Disconnecting redis client...");
        this.redisClient?.disconnect();
    }

    get redisClientInstance() {
        return this.redisClient;
    }

}
import { Parameter } from "../core/parameter";
import { BootstrapReturn, IBootstrap } from "./bootstrap.interface";
import amqplib from 'amqplib';
export class RabbitmqBootstrap implements IBootstrap {

    channel!: amqplib.Channel;
    connection!: amqplib.Connection;
    constructor(private readonly parameters: Parameter) {

    }

    async init(): Promise<BootstrapReturn> {

        try {
     
            const host = this.parameters.rabbittmqHost;
            this.connection = await amqplib.connect(`amqp://${host}`);
            this.channel = await this.connection.createChannel();
            console.log("Rabbitmq initialized")
            return Promise.resolve(true);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async close() {
        await this.connection?.close();
    }
}
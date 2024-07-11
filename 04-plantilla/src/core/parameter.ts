export class Parameter {

    get port() {
        return process.env.APP_PORT || 3000;
    }

    get mysql_config() {
        console.log({env: process.env})
        return {
            host: process.env.MYSQL_HOST,
            port: +process.env.MYSQL_PORT!,
            database: process.env.MYSQL_DATABASE!,
            username: process.env.MYSQL_USER!,
            password: process.env.MYSQL_PASSWORD!,
            synchronize: Boolean(process.env.MYSQL_SYNCHRONIZE!),
            logging: Boolean(process.env.MYSQL_LOGGING!),
            entities: [process.env.MYSQL_ENTITIES!],
            poolSize: +process.env.MYSQL_POOL_SIZE!,
            maxQueryExecutionTime: +process.env.MYSQL_MAX_QUERY_EXECUTION_TIME!,
        }
    }

    get rabbittmqHost() {
        return process.env.RABBITMQ_HOST!;
    }
}

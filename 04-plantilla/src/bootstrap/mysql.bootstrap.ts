import { DataSource } from 'typeorm';
import { Parameter } from '../core/parameter';
import { BootstrapReturn, IBootstrap } from './bootstrap.interface'
import { log } from 'console';

export class MysqlBootstrap implements IBootstrap {

    private static appDataSource: DataSource;
    constructor(private readonly parameters: Parameter) {
        
    }

    init(): Promise<BootstrapReturn> {
        const mysqlConfig = this.parameters.mysql_config;
        MysqlBootstrap.appDataSource = new DataSource({
            type: "mysql",
            ...mysqlConfig
        });

        return MysqlBootstrap.appDataSource.initialize();
    }

    close() {
        log("Closing mysql connection database....");
        MysqlBootstrap.appDataSource?.destroy();
    }

    getDataSource(): DataSource {
        return MysqlBootstrap.appDataSource;
    }
}
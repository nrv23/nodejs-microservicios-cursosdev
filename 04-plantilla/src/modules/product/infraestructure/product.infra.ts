
import { IsNull, Not } from "typeorm";
import { MysqlBootstrap } from "../../../bootstrap/mysql.bootstrap";
import { Product } from "../domain/product";
import { ProductRepository } from "../domain/repositories/product.repository";
import { ProductDto } from "./dto/product.dto";
import { ProductEntity } from "./entities/product.entity";


export class ProductInfra implements ProductRepository {


    constructor(private readonly dataSource: MysqlBootstrap) {

    }

    async save(product: Product): Promise<void> {
       
        const repo = this.dataSource.getDataSource().getRepository(ProductEntity);
        const productEntity =  ProductDto.fromDomainData(product);
        await repo.save(productEntity);
    }
    async findById(id: string): Promise<Product | undefined> {

        const repo = this.dataSource.getDataSource().getRepository(ProductEntity);
        const product = await repo.findOne({
            where: {
                id,
                deletedAt: IsNull()
            }
        });
    
        return product && ProductDto.fromDataToDomain(product) as Product;
    }
    async find(): Promise<Product[]> {
        const repo = this.dataSource.getDataSource().getRepository(ProductEntity);
        const products = await repo.find({
            where: {
                deletedAt: IsNull()
            }
        });

        return products.length > 0 && ProductDto.fromDataToDomain(products) as Product[];
    }
    getByPage(page: number, pageSize: number): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }

}
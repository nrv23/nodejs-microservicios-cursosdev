import { Product } from "../domain/product";
import { ProductRepository } from "../domain/repositories/product.repository";

export class ProductInfra implements ProductRepository {
    save(product: Product): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Product | undefined> {
        throw new Error("Method not implemented.");
    }
    find(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    getByPage(page: number, pageSize: number): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }

}
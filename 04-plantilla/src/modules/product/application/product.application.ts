import { Product } from "../domain/product";
import { ProductRepository } from "../domain/repositories/product.repository";


export class ProductApplication {
    constructor(private readonly repository: ProductRepository) {}

    async save(product: Product) {
        return await this.repository.save(product);
    }

    async findById(id: string) {
        return await this.repository.findById(id);
    }

    async find() {
        return await this.repository.find();
    }

    async getByPage(page:number, pageSize:number) {
        return await this.repository.getByPage(page, pageSize);
    }
}
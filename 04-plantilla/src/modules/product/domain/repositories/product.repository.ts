import { Product } from "../product";

export interface ProductRepository {

    save(product: Product): Promise<void>;
    findById(id:string): Promise<Product | undefined>;
    find(): Promise<Product[]>;
    getByPage(page:number, pageSize: number): Promise<Product[]>;
}
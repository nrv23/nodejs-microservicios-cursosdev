import { ProductApplication } from "../../application/product.application";
import { v4 as uuid } from 'uuid';
import { Request, Response, NextFunction } from 'express';
import { Product, ProductProperties } from "../../domain/product";


export class ProductController {
    constructor(
        private readonly productApplication: ProductApplication
    ) {
    }

    async insert(req: Request, res: Response, next: NextFunction) {
            
        const { body } = req;
        console.log({body})
        const id = uuid();
        const productProperties: ProductProperties = body;
        const product = new Product({...productProperties, id});

        await this.productApplication.save(product);

        return res.status(201).json(product);
    }
}
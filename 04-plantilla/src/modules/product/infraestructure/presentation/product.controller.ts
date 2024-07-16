import { ProductApplication } from "../../application/product.application";
import { v4 as uuid } from 'uuid';
import { Request, Response, NextFunction } from 'express';
import { Product, ProductProperties } from "../../domain/product";


export class ProductController {
    constructor(
        private readonly productApplication: ProductApplication
    ) {
        // this.insert = this.insert.bind(this)
    }

    insert = async (req: Request, res: Response, next: NextFunction) => {

        const { body } = req;
        const id = uuid();
        const productProperties: ProductProperties = body;
        const product = new Product({ ...productProperties, id });
        await this.productApplication.save(product);
        return res.status(201).json(product);
    }

    findById = async (req: Request, res: Response, next: NextFunction) => { 
        const { params:{
            id
        } } = req;  
   
        const product = await this.productApplication.findById(id);
        return res.status(201).json(product);
    }

    find = async (req: Request, res: Response, next: NextFunction) => {   
   
        const product = await this.productApplication.find();
        return res.status(201).json(product);
    }
}
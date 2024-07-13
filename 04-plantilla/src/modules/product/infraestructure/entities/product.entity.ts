import { Entity } from "typeorm";

@Entity({name: "Product"})
export class ProductEntity {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
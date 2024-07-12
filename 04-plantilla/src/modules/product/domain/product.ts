export interface ProductEssentials {
    name: string;
    price: number;
    description: string;
    image: string;
}

export interface ProductOptionals {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export type ProductProperties = ProductEssentials & Partial<ProductOptionals>;
export type ProductUpdate = Partial<ProductEssentials>;

export class Product {
    private readonly id: string;
    private name: string;
    private price: number;
    private description: string;
    private image: string;
    private createdAt?: Date;
    private updatedAt?: Date;
    private deletedAt?: Date;

    constructor(product: ProductProperties) {
        Object.assign(this, product); // mapear propiedades con valores que cumplan con el tipo ProductProperties
        this.createdAt = new Date();
    }

    get properties() {
        return { ...this };
    }

    update(fieldsToUpdate: ProductUpdate) {
        Object.assign(this,fieldsToUpdate);
        this.updatedAt = new Date();
    }

    delete() {
        this.deletedAt = new Date();
    }
}
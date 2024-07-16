import { Product, ProductProperties } from "../../domain/product"
import { ProductEntity } from "../entities/product.entity"

export class ProductDto {
    static fromDomainData(product: Product): ProductEntity {

        const productEntity = new ProductEntity();
        productEntity.id = product.properties.id
        productEntity.name = product.properties.name
        productEntity.price = product.properties.price
        productEntity.description = product.properties.description
        productEntity.image = product.properties.image
        productEntity.createdAt = product.properties.createdAt
        productEntity.updatedAt = product.properties.updatedAt
        productEntity.deletedAt = product.properties.deletedAt

        return productEntity;

    }

    static fromDataToDomain(
        data: ProductEntity | ProductEntity[]
      ): Product | Product[] {
        if (Array.isArray(data)) {
          return data.map((item) => this.fromDataToDomain(item)) as Product[];
        }
    
        const props: ProductProperties = { ...data };
        return new Product(props);
      }
}
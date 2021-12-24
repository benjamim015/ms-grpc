import { Product } from '../domain/product';
import { ProductDTO } from './product-dto';

export class ProductMapper {
  static toDomain(productDTO: ProductDTO): Product {
    return new Product({
      id: productDTO.id,
      thumbnail: productDTO.thumbnail,
      name: productDTO.name,
      price: productDTO.price,
      ingredients: productDTO.ingredients,
      availability: productDTO.availability,
      volume: productDTO.volume,
      pharmacyId: productDTO.pharmacyId,
    });
  }

  static toDTO(product: Product): ProductDTO {
    return {
      id: product.id,
      thumbnail: product.thumbnail,
      name: product.name,
      price: product.price,
      ingredients: product.ingredients,
      availability: product.availability,
      volume: product.volume,
      pharmacyId: product.pharmacyId,
    };
  }

  static toPersistence(product: Product) {
    return {
      id: product.id,
      thumbnail: product.thumbnail,
      name: product.name,
      price: product.price,
      ingredients: product.ingredients,
      availability: product.availability,
      volume: product.volume,
      pharmacyId: product.pharmacyId,
    };
  }
}

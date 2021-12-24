import { Product } from '../src/domain/product';
import { IProductRepository } from '../src/domain/product-repository';

export class ProductRepositoryMemory implements IProductRepository {
  products: Product[] = [];

  async create(product: Product): Promise<void> {
    this.products.push(product);
  }

  async update(product: Product): Promise<void> {
    this.products = this.products.map((p) => {
      if (p.id === product.id) return product;
      return p;
    });
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter((p) => p.id !== id);
  }

  async get(id: string): Promise<Product | undefined> {
    return this.products.find((p) => p.id === id);
  }

  async getAll(): Promise<Product[]> {
    return this.products;
  }

  async clone(product: Product, pharmacyId: string): Promise<void> {
    const newProduct = new Product({
      id: product.id,
      thumbnail: product.thumbnail,
      name: product.name,
      price: product.price,
      ingredients: product.ingredients,
      availability: product.availability,
      volume: product.volume,
      pharmacyId,
    });
    this.products.push(newProduct);
  }
}

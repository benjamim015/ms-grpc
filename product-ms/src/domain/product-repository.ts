import { Product } from './product';

export interface IProductRepository {
  create(product: Product): Promise<void>;
  update(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
  get(id: string): Promise<Product | undefined>;
  getAll(): Promise<Product[]>;
  clone(product: Product, pharmacyId: string): Promise<void>;
}

import { PharmacyDTO, ProductDTO } from '../product-dto';

export interface IProductService {
  create(product: ProductDTO): Promise<ProductDTO>;
  update(product: ProductDTO, id: string): Promise<ProductDTO>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<ProductDTO & { pharmacy: PharmacyDTO }>;
  getAll(): Promise<ProductDTO[]>;
  clone(productId: string, pharmacyId: string): Promise<void>;
}

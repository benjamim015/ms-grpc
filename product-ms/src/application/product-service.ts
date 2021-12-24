import { IGRPCService } from './contracts/grpc-service';
import { ConflictError, NotFoundError } from './application-errors';
import { PharmacyDTO, ProductDTO } from './product-dto';
import { Product } from '../domain/product';
import { IProductService } from './contracts/product-service';
import { IProductRepository } from '../domain/product-repository';
import { ProductMapper } from './product-mapper';

export class ProductService implements IProductService {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly grpcService: IGRPCService,
  ) {}

  async create(productDto: ProductDTO): Promise<ProductDTO> {
    const pharmacy = await this.grpcService.getPharmacyById(
      productDto.pharmacyId,
    );
    if (!pharmacy) throw new NotFoundError('Pharmacy not found');
    const newProduct = ProductMapper.toDomain(productDto);
    await this.productRepository.create(newProduct);
    return newProduct;
  }

  async update(product: Partial<ProductDTO>, id: string): Promise<ProductDTO> {
    const foundProduct = await this.productRepository.get(id);
    if (!foundProduct) throw new NotFoundError('Product not found');
    const updatedProduct = new Product({
      id: foundProduct.id,
      thumbnail: product.thumbnail || foundProduct.thumbnail,
      name: product.name || foundProduct.name,
      price: product.price || foundProduct.price,
      ingredients: product.ingredients || foundProduct.ingredients,
      availability: product.availability || foundProduct.availability,
      volume: product.volume || foundProduct.volume,
      pharmacyId: foundProduct.pharmacyId,
    });
    await this.productRepository.update(updatedProduct);
    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    const foundProduct = await this.productRepository.get(id);
    if (!foundProduct) throw new NotFoundError('Product not found');
    await this.productRepository.delete(id);
  }

  async getById(id: string): Promise<ProductDTO & { pharmacy: PharmacyDTO }> {
    const foundProduct = await this.productRepository.get(id);
    if (!foundProduct) throw new NotFoundError('Product not found');
    const pharmacy = await this.grpcService.getPharmacyById(
      foundProduct.pharmacyId,
    );
    return { ...foundProduct, pharmacy };
  }

  async getAll(): Promise<ProductDTO[]> {
    return this.productRepository.getAll();
  }

  async clone(productId: string, pharmacyId: string): Promise<void> {
    const foundProduct = await this.productRepository.get(productId);
    if (!foundProduct) throw new NotFoundError('Product not found');
    if (foundProduct.pharmacyId === pharmacyId)
      throw new ConflictError('Product already exists in this pharmacy');
    const pharmacy = await this.grpcService.getPharmacyById(pharmacyId);
    if (!pharmacy) throw new NotFoundError('Pharmacy not found');
    await this.productRepository.clone(foundProduct, pharmacyId);
  }
}

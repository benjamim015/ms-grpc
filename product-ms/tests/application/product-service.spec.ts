import faker from 'faker';
import { IGRPCService } from '../../src/application/contracts/grpc-service';
import { ProductService } from '../../src/application/product-service';
import { Product } from '../../src/domain/product';
import { ProductRepositoryMemory } from '../product-repository-memory';

class GRPCServiceStub implements IGRPCService {
  async getPharmacyById(_id: string): Promise<any> {
    return {};
  }
}

const productData = {
  thumbnail: faker.image.imageUrl(),
  name: faker.commerce.productName(),
  price: Number(faker.commerce.price()),
  ingredients: faker.lorem.sentence(),
  availability: faker.datatype.number(),
  volume: faker.datatype.number(),
  pharmacyId: faker.datatype.uuid(),
};

describe('ProductService', () => {
  let sut: ProductService;
  let productRepository: ProductRepositoryMemory;
  let grpcService: IGRPCService;

  beforeEach(() => {
    productRepository = new ProductRepositoryMemory();
    grpcService = new GRPCServiceStub();
    sut = new ProductService(productRepository, grpcService);
  });

  describe('create()', () => {
    it('should create a product', async () => {
      const product = await sut.create(productData);
      expect(product).toHaveProperty('id');
    });

    it('should return an error if pharmacy not found', async () => {
      jest
        .spyOn(grpcService, 'getPharmacyById')
        .mockResolvedValueOnce(undefined);
      await expect(sut.create(productData)).rejects.toThrow();
    });
  });

  describe('update()', () => {
    it('should update a product', async () => {
      const product = new Product(productData);
      await productRepository.create(product);
      const updatedProduct = await sut.update(
        { name: 'updated-name' },
        product.id,
      );
      expect(updatedProduct.id).toBe(product.id);
      expect(updatedProduct.name).toBe('updated-name');
      expect(updatedProduct.thumbnail).toBe(product.thumbnail);
    });

    it('should return an error if product not found', async () => {
      await expect(
        sut.update({ name: 'updated-name' }, 'not-found'),
      ).rejects.toThrow();
    });
  });

  describe('delete()', () => {
    it('should delete a product', async () => {
      const product = new Product(productData);
      await productRepository.create(product);
      await sut.delete(product.id);
      expect(await productRepository.getAll()).toHaveLength(0);
    });

    it('should return an error if product not found', async () => {
      await expect(sut.delete('not-found')).rejects.toThrow();
    });
  });

  describe('getById()', () => {
    it('should get a product', async () => {
      const product = new Product(productData);
      await productRepository.create(product);
      const foundProduct = await sut.getById(product.id);
      expect(foundProduct.id).toBe(product.id);
      expect(foundProduct.name).toBe(product.name);
      expect(foundProduct.thumbnail).toBe(product.thumbnail);
    });

    it('should return an error if product not found', async () => {
      await expect(sut.getById('not-found')).rejects.toThrow();
    });
  });

  describe('getAll()', () => {
    it('should get all products', async () => {
      const product = new Product(productData);
      await productRepository.create(product);
      const foundProducts = await sut.getAll();
      expect(foundProducts).toHaveLength(1);
      expect(foundProducts[0].id).toBe(product.id);
      expect(foundProducts[0].name).toBe(product.name);
      expect(foundProducts[0].thumbnail).toBe(product.thumbnail);
    });
  });

  describe('clone()', () => {
    it('should clone a product', async () => {
      const product = new Product(productData);
      await productRepository.create(product);
      const pharmacyId = faker.datatype.uuid();
      await sut.clone(product.id, pharmacyId);
      const foundProducts = await productRepository.getAll();
      expect(foundProducts).toHaveLength(2);
      expect(foundProducts[0].id).toBe(product.id);
      expect(foundProducts[0].name).toBe(product.name);
      expect(foundProducts[0].thumbnail).toBe(product.thumbnail);
      expect(foundProducts[1].pharmacyId).toBe(pharmacyId);
    });

    it('should return an error if product not found', async () => {
      await expect(
        sut.clone('not-found', faker.datatype.uuid()),
      ).rejects.toThrow();
    });

    it('should return an error if product already exists in pharmacy', async () => {
      const product = new Product(productData);
      await productRepository.create(product);
      await expect(sut.clone(product.id, product.pharmacyId)).rejects.toThrow();
    });
  });
});
